import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
    queryParams: ['state', 'page', 'order'],
    // query params will be a separate  value for every object implementing the mixin
    state: 'active',
    page: 1,
    order: 'asc',

  jobs: service(),
  notifications: service('notification-messages'),
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
