import Ember from 'ember';

export default Ember.Component.extend({
    selections: Ember.computed.alias('jobs.STATES'),
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
