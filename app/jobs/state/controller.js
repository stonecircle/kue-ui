import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['page', 'order'],
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
        }

    }
});
