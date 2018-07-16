import { isEmpty } from '@ember/utils';
import { Promise } from 'rsvp';
import { A, isArray } from '@ember/array';
import Service, { inject as service } from '@ember/service';
import { get } from '@ember/object';
import request from 'ember-ajax/request';

import config from '../config/environment';
import Job from '../models/job-non-model';

export default Service.extend({

  ajax: service(),
  session: service(),
  notifications: service('notification-messages'),

  STATES: A(['active', 'complete', 'delayed', 'failed', 'inactive']),

  request(opts={}) {
    return new Promise((resolve) => {
      if (this.get('session.isAuthenticated')) {
        this.session.authorize('authorizer:application', (key, value) => {
          resolve({
            [key]: value
          });
        });
      } else {
        if (get(window, '__kueUiExpress.authmaker')) {
          this.session.invalidate();
        }
        resolve({});
      }
    })
    .then((headers) => {
      return request(`${get(window, '__kueUiExpress.apiURL') || config.apiURL}/${opts.url}`, {
        method: opts.method,
        data: opts.data,
        headers: headers,
        contentType: opts.contentType,
      })
      .then(null, (err) => {
        if (get(err, 'errors.0.status') === '401') {
          this.session.invalidate();
        }

        throw err;
      });
    });

  },

  stats(opts={}) {
      var type = opts.type;
      var state = opts.state;
      var url = '';

      if (!isEmpty(type) && !isEmpty(state)) {
          url = `jobs/${type}/${state}/stats`;
      } else {
          url = `stats`;
      }

      return this.request({
        url,
      });
  },

  find(opts={}) {
      var size = Number(opts.size) || 20;
      var page = Number(opts.page) || 1;
      var from = (page - 1) * size;
      var to = page * size ;

      var url = `${config.apiURL}/${from}..${to}`;

      if(opts.type && opts.state) {
          url = `jobs/${opts.type}/${opts.state}/${from}..${to}`;
      } else if(opts.type) {
          url = `jobs/${opts.type}/${from}..${to}`;
      } else if(opts.state) {
          url = `jobs/${opts.state}/${from}..${to}`;
      }

      if (opts.order) { url += `/${opts.order}?`; }

      return this.request({
          data: opts.data || {},
          method: 'GET',
          url: url
      })
      .then( data => {
          if (isArray(data)) {
              return data.map( obj => Job.create(obj) );
          } else {
              return Job.create(data);
          }
      });
  },

  updateState(id, state) {
      return this.request({
          method: 'PUT',
          url: `job/${id}/state/${state}`
      })
      .catch((err) => {
        this.notifications.error(`Job state update error ${err.message}`);
      });
  },

  findOne(opts={}) {
      return this.request({
          method: 'GET',
          url: `job/${opts.id}`
      })
      .then(function(result){
        return Job.create(result);
      });
  },

  types() {
      return this.request({
          method: 'GET',
          url: `job/types/`
      });
  },

  remove(job) {
    var id = job.get('id');
    return this.request({
      method: 'DELETE',
      url: `job/${id}/`
    })
    .catch((err) => {
      this.notifications.error(`Error removing Job: ${err.message}`);
      throw err;
    });
  },

  create(jobBody) {
    return this.request({
      method: 'POST',
      url: 'job',
      data: jobBody,
      contentType: 'application/json'
    });
  }
});
