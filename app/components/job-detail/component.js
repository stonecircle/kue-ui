import Ember from 'ember';
import Job from 'client/models/job-non-model';

export default Ember.Component.extend({
    selections: Job.STATES,
    jobs: Ember.inject.service(),

    setup: Ember.on('init', function() {
        this.set('job.selected', this.get('job.state'));
    }).observes('job.id'),

    selectedStateDidChange: Ember.observer('job.selected', function() {
        if (Ember.isEmpty(this.get('job.state'))) return;

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
