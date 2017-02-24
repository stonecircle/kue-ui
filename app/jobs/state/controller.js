import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['page', 'order'],
    page: 1,
    order: 'asc',

    jobs: Ember.inject.service(),
  notifications: Ember.inject.service('notification-messages'),
  actions: {
    removeJob(job) {
      this.get('jobs').remove(job).then(() => {
        this.get('notifications').success('Job Deleted', {
          autoClear: true,
        });
        this.get('model').removeObject(job);
      });
    },

        updateOrder() {
            const order = this.get('order');
            this.set('order', order === 'asc' ? 'desc' : 'asc');
        }
  }
});
