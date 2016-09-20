import Ember from 'ember';
import config from 'client/config/environment';

import Job from 'client/models/job-non-model';

export default Ember.Service.extend({

  ajax: Ember.inject.service(),
  session: Ember.inject.service(),

  request(opts={}) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.get('session').authorize('authorizer:application', (key, value) => {
        this.get('ajax').request(opts.url, {
          headers: {
            [key]: value
          },
          data: opts.data,
          type: opts.method
        })
        .then(resolve)
        .catch((err) => {
          if (Ember.get(err, 'errors.0.status') === '401') {
            this.get('session').invalidate();
          }

          reject(err);
        });
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
});
