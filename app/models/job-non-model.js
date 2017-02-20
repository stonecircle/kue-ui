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

    updateState(state) {
        var id = this.get('id');
        state = state || this.get('state');

        return Job._request({
            method: 'PUT',
            url: `${window.__kueUiExpress ? window.__kueUiExpress.apiURL : config.apiURL}/job/${id}/state/${state}`
        })
        .then(function(job) {
            return job;
        })
        .catch(function(err) {
            console.warn('Job state update error', err);
        });
    },

    remove() {
        var id = this.get('id');
        return Job._request({
            method: 'DELETE',
            url: `${window.__kueUiExpress ? window.__kueUiExpress.apiURL : config.apiURL}/job/${id}/`
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
     * Find jobs
     * @param  {Object} opts Options
     * @return {Object}      Promise
     */
    find(opts={}) {
        var size = Number(opts.size) || 20;
        var page = Number(opts.page) || 1;
        var from = (page - 1) * size;
        var to = page * size ;
        console.log('find', opts);
        var url = `${window.__kueUiExpress ? window.__kueUiExpress.apiURL : config.apiURL}/${from}..${to}`;

        if(opts.type && opts.state) {
            url = `${window.__kueUiExpress ? window.__kueUiExpress.apiURL : config.apiURL}/jobs/${opts.type}/${opts.state}/${from}..${to}`;
        } else if(opts.type) {
            url = `${window.__kueUiExpress ? window.__kueUiExpress.apiURL : config.apiURL}/jobs/${opts.type}/${from}..${to}`;
        } else if(opts.state) {
            url = `${window.__kueUiExpress ? window.__kueUiExpress.apiURL : config.apiURL}/jobs/${opts.state}/${from}..${to}`;
        }

        if (opts.order) url += `/${opts.order}?`;

        return this._request({
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

    /**
     * FindOne Job
     * @param  {Object} opts={} Options
     * @return {Object}           Promise
     */
    findOne(opts={}) {
        return this._request({
            method: 'GET',
            url: `${window.__kueUiExpress ? window.__kueUiExpress.apiURL : config.apiURL}/job/${opts.id}`
        })
        .then(function(result){
          return Job.create(result);
        });
    },

    /**
     * Fetch stats from the Jobs
     * @return {Object} Promise
     */
    stats(opts={}) {
        var type = opts.type;
        var state = opts.state;
        var url = '';

        if (!Ember.isEmpty(type) && !Ember.isEmpty(state)) {
            url = `${window.__kueUiExpress ? window.__kueUiExpress.apiURL : config.apiURL}/jobs/${type}/${state}/stats`;
        } else {
            url = `${window.__kueUiExpress ? window.__kueUiExpress.apiURL : config.apiURL}/stats`;
        }

        return this._request({
            method: 'GET',
            url: url
        });
    },

    /**
     * Return all the job types
     * @return {Object} Promise
     */
    types() {
        return this._request({
            method: 'GET',
            url: `${window.__kueUiExpress ? window.__kueUiExpress.apiURL : config.apiURL}/job/types/`
        });
    },

});

export default Job;
