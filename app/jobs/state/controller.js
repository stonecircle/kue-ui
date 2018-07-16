import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
    queryParams: ['page', 'order'],
    page: 1,
    order: 'asc',

    jobs: service(),
  notifications: service('notification-messages'),
  actions: {
    removeJob(job) {
      this.jobs.remove(job).then(() => {
        this.notifications.success('Job Deleted', {
          autoClear: true,
        });
        this.model.removeObject(job);
      });
    },

        updateOrder() {
            const order = this.order;
            this.set('order', order === 'asc' ? 'desc' : 'asc');
        }
  }
});
