import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['state', 'page', 'order'],
    // query params will be a separate  value for every object implementing the mixin
    state: 'active',
    page: 1,
    order: 'asc',

  jobs: Ember.inject.service(),

  actions: {
    removeJob(job) {
      this.get('jobs').remove(job).then(() => {
        this.get('notifications').success('Job Deleted', {
          autoClear: true,
        });
        this.get('model').removeObject(job);
      });
    },

        goToJob(job) {
            this.transitionToRoute('jobs.show', job);
        },

        updateOrder() {
            const order = this.get('order');
            this.set('order', order === 'asc' ? 'desc' : 'asc');
            this.set('page', 1);
        }
  }
});
