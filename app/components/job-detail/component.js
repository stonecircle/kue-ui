import { isEmpty } from '@ember/utils';
import { observer, computed } from '@ember/object';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import DS from 'ember-data';

export default Component.extend({
    selections: alias('jobs.STATES'),
    jobs: service(),

    setup: on('init', function() {
        this.set('job.selected', this.get('job.state'));
    }).observes('job.id'),

  jobLog: computed('job.id', function() {
    return DS.PromiseObject.create({
      promise: this.get('jobs').getLog(this.get('job')),
    });
  }),

    selectedStateDidChange: observer('job.selected', function() {
        if (isEmpty(this.get('job.state'))) {
          return;
        }

        if (this.get('job.state') !== this.get('job.selected')) {
            this.set('job.state', this.get('job.selected'));

            this.jobs.updateState(this.get('job.id'), this.get('job.state'));
        }
    }),

  actions: {
    goToJob(job) {
      // eslint-disable-next-line ember/closure-actions
      this.sendAction('action', job);
    },

    removeJob(job) {
      //TODO: use closure actions
      // eslint-disable-next-line ember/closure-actions
      this.sendAction('removeAction', job);
    }
  }
});
