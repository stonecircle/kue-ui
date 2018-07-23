import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams: ['page', 'order', 'forceUpdate'],
  page: 1,
  order: 'asc',

  jobs: service(),
  notifications: service('notification-messages'),

  selectedJobs: computed('model.@each.checked', function() {
    return this.model.filter(job => job.checked);
  }),

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
    },
    refresh() {
      this.transitionToRoute('jobs.state', { queryParams: {
        page: this.page,
        forceUpdate: Date.now(),
      }});
    }
  }
});
