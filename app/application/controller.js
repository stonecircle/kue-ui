import Ember from 'ember';
import _ from 'lodash';

import ENV from '../config/environment';

export default Ember.Controller.extend({
    indexController: Ember.inject.controller('jobs/index'),

    jobId: '',
    jobs: Ember.inject.service(),

    initStatsRefresh: Ember.on('init', function() {
        var self = this;
        self.updateStats(); // first call

        if (!isNaN(ENV.updateInterval)) {
            setInterval(() => self.updateStats(), ENV.updateInterval); // every Xs
        }
    }),

    updateStats() {
        var self = this;
        this.get('jobs').stats().then(function(data) {
            self.set('stats', data);
            return self.getCountBreakdowns();
        })
        .then(function(res) {
            self.set('breakdowns', res);
            self.get('indexController').set('breakdowns', res);
        });
    },

    getAllStates(type) {
        var promises = this.get('jobs.STATES').map((state) => {
            var query = { type: type, state: state };
            return this.get('jobs').stats(query).then( res => _.extend(res, query) );
        });
        return Ember.RSVP.Promise.all(promises);
    },

    getCountBreakdowns() {
        return this.get('jobs').stats().then((stats) => {
            return this.get('indexController').set('stats', stats);
        })
        .then(() => this.get('jobs').types())
        .then((types) => {
            var promises = types.map(type =>  this.getAllStates(type));
            return Ember.RSVP.Promise.all(promises).then(_.flatten);
        });
    },

    actions: {
        goToTypeRoute(obj) {
            this.transitionToRoute('jobs.type', obj.type, {queryParams:
                {state: obj.state || 'active'}
            });
        },

        goToJobRoute() {
            this.transitionToRoute('jobs.show', this.get('jobId'));
        }
    }

});
