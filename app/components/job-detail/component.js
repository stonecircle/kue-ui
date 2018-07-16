import { isEmpty } from '@ember/utils';
import { observer } from '@ember/object';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
    selections: alias('jobs.STATES'),
    jobs: service(),

    setup: on('init', function() {
        this.set('job.selected', this.get('job.state'));
    }).observes('job.id'),

    selectedStateDidChange: observer('job.selected', function() {
        if (isEmpty(this.get('job.state'))) {
          return;
        }

        if (this.get('job.state') !== this.get('job.selected')) {
            this.set('job.state', this.get('job.selected'));

            this.get('jobs').updateState(this.get('job.id'), this.get('job.state'));
        }
    }),

    actions: {

        goToJob(job) {
            this.sendAction('action', job);
        },

        removeJob(job) {
            this.sendAction('removeAction', job);
        }
     }
});
