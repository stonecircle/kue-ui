import { Promise } from 'rsvp';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
import Controller, { inject as controller } from '@ember/controller';
import _ from 'lodash';

import ENV from '../config/environment';

export default Controller.extend({
    indexController: controller('jobs/index'),

    jobId: '',
    jobs: service(),
    notifications: service('notification-messages'),

    initStatsRefresh: on('init', function() {
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
        return Promise.all(promises);
    },

    getCountBreakdowns() {
        return this.get('jobs').stats().then((stats) => {
            return this.get('indexController').set('stats', stats);
        })
        .then(() => this.get('jobs').types())
        .then((types) => {
            var promises = types.map(type =>  this.getAllStates(type));
            return Promise.all(promises).then(_.flatten);
        });
    },

    actions: {
      goToTypeRoute(obj) {
        this.transitionToRoute('jobs.type', obj.type, {
          queryParams: {
            state: obj.state || 'active'
          }
        });
      },
      closeAddDialog() {
        this.set('newJobBody', '');
        this.set('showAddDialog', false);
      },
      createJob() {
        this.get('jobs').create(this.get('newJobBody')).then(() => {
          this.get('notifications').success('Job Created Successfully', {
            autoClear: true,
          });
          this.set('newJobBody', '');
          this.set('showAddDialog', false);
        }, (err) => {
          console.log(err);
          this.get('notifications').error(`Error creating job: ${err.messsage}`);
        });
      }
    }

});
