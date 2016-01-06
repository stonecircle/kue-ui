import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['state', 'page', 'order'],
    // query params will be a separate  value for every object implementing the mixin
    state: 'active',
    page: 1,
    order: 'asc',

    actions: {

        goToJob(job) {
            this.transitionToRoute('jobs.show', job);
        },

        removeJob(job) {
            var self = this;
            job.remove().then(function() {
                self.get('model').removeObject(job);
            });
        },

        updateOrder() {
            const order = this.get('order');
            this.set('order', order === 'asc' ? 'desc' : 'asc');
            this.set('page', 1);
        }
    }
});
