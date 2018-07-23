import Controller, { inject as controller} from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  queryParams: ['state', 'page', 'order', 'size', 'forceUpdate'],

  state: 'active',
  page: 1,
  order: 'asc',
  size: 20,

  sizes: Object.freeze([20, 50, 100, 200]),

  jobs: service(),
  notifications: service('notification-messages'),
  application: controller(),

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

    goToJob(job) {
      this.transitionToRoute('jobs.show', job);
    },

    updateOrder() {
      const order = this.order;
      this.set('order', order === 'asc' ? 'desc' : 'asc');
      this.set('page', 1);
    },
    refresh() {
      this.transitionToRoute('jobs.type', { queryParams: {
        page: this.page,
        forceUpdate: Date.now(),
      }});
    }
  }
});
