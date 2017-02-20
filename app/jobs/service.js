import Ember from 'ember';
import request from 'ember-ajax/request';

import config from '../config/environment';
import Job from '../models/job-non-model';

export default Ember.Service.extend({

  ajax: Ember.inject.service(),
  session: Ember.inject.service(),
  notifications: Ember.inject.service('notification-messages'),

  STATES: Ember.A(['active', 'complete', 'delayed', 'failed', 'inactive']),

  request(opts={}) {
    return new Ember.RSVP.Promise((resolve) => {
      if (this.get('session.isAuthenticated')) {
        this.get('session').authorize('authorizer:application', (key, value) => {
          resolve({
            [key]: value
          });
        });
      } else {
        if (Ember.get(window, '__kueUiExpress.authmaker')) {
          this.get('session').invalidate();
        }
      }
    })
    .then((headers) => {
      return request(opts.url, {
        method: opts.method,
        data: opts.data,
        headers: headers,
      })
      .then(null, (err) => {
        if (Ember.get(err, 'errors.0.status') === '401') {
          this.get('session').invalidate();
        }

        throw err;
      });
    });

  },

  stats(opts={}) {
      var type = opts.type;
      var state = opts.state;
      var url = '';

      if (!Ember.isEmpty(type) && !Ember.isEmpty(state)) {
          url = `${config.apiURL}/jobs/${type}/${state}/stats`;
      } else {
          url = `${config.apiURL}/stats`;
      }

      var session = this.get('session');

      return this.request({
        url,
      })
  },

  find(opts={}) {
      var size = Number(opts.size) || 20;
      var page = Number(opts.page) || 1;
      var from = (page - 1) * size;
      var to = page * size ;
      console.log('find', opts);
      var url = `${config.apiURL}/${from}..${to}`;

      if(opts.type && opts.state) {
          url = `${config.apiURL}/jobs/${opts.type}/${opts.state}/${from}..${to}`;
      } else if(opts.type) {
          url = `${config.apiURL}/jobs/${opts.type}/${from}..${to}`;
      } else if(opts.state) {
          url = `${config.apiURL}/jobs/${opts.state}/${from}..${to}`;
      }

      if (opts.order) url += `/${opts.order}?`;

      return this.request({
          data: opts.data || {},
          method: 'GET',
          url: url
      })
      .then( data => {
          if (Ember.isArray(data)) {
              return data.map( obj => Job.create(obj) );
          } else {
              return Job.create(data);
          }
      });
  },

  updateState(id, state) {
      return this.request({
          method: 'PUT',
          url: `${config.apiURL}/job/${id}/state/${state}`
      })
      .then(function(job) {
          return job;
      })
      .catch(function(err) {
          console.warn('Job state update error', err);
      });
  },

  findOne(opts={}) {
      return this.request({
          method: 'GET',
          url: `${config.apiURL}/job/${opts.id}`
      })
      .then(function(result){
        return Job.create(result);
      });
  },

  types() {
      return this.request({
          method: 'GET',
          url: `${config.apiURL}/job/types/`
      });
  },

  remove(job) {
    var id = job.get('id');
    return this.request({
      method: 'DELETE',
      url: `${config.apiURL}/job/${id}/`
    })
    .catch((err) => {
      console.warn('Job remove error', err);
      this.get('notifications').error(`Error removing Job: ${err.message}`);
      throw err;
    });
  }
});
