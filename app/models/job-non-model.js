import Ember from 'ember';
import config from '../config/environment';

import request from 'ember-ajax/request';

// '/stats'
// '/job/search'
// '/jobs/:from..:to/:order?'
// '/jobs/:type/:state/:from..:to/:order?'
// '/jobs/:state/:from..:to/:order?'
// '/job/types'
// '/job/:id'
// '/job/:id/log'
// '/job/:id/state/:state'
// '/job/:id/priority/:priority'
// '/job/:id'
// '/job'
// http://localhost:3000/kue/job/3/state/delayed
/**
 * Job model
 * @class Encapsulates the JSON API for `/jobs`
 */
var Job = Ember.Object.extend({ // Instance methods

    deleted: Ember.computed.alias('isDestroyed'),

    remove() {
        var id = this.get('id');
        return Job._request({
            method: 'DELETE',
            url: `${config.apiURL}/job/${id}/`
        })
        .catch(function(err) {
            console.warn('Job remove error', err);
        });
    }

});

Job.reopenClass({ // Class methods

    STATES: Ember.A(['active', 'complete', 'delayed', 'failed', 'inactive']),

    /**
     * Request method
     * @param  {Object} opts Options
     * @return {Object}      Promise
     */
    _request(opts={}) {
      return request(opts.url, {
        method: opts.method,
        data: opts.data,
      });
    },

    /**
     * Return all the job types
     * @return {Object} Promise
     */
    types() {
        return this._request({
            method: 'GET',
            url: `${config.apiURL}/job/types/`
        });
    },

});

export default Job;
