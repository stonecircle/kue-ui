import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  jobs: service(),
  notifications: service('notification-messages'),

  actions: {
    removeJob(job) {
      this.jobs.remove(job).then(() => {
        this.notifications.success('Job Deleted', {
          autoClear: true,
        });
      });
    },
  }
});
