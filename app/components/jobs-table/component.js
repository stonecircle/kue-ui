import Ember from 'ember';

export default Ember.Component.extend({
    selectedJob: null,
    hasSelectedJob: Ember.computed.gt('selectedJob.id.length', 0),
    order: null,

    actions: {
        showDetail(job) {
            this.set('selectedJob', job);
            this.get('jobs').setEach('active', false);
            job.set('active', true);
        },

        toggleArrow() {
            this.sendAction('orderAction');
        }
    }
});
