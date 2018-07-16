import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  jobs: service(),
  notifications: service('notification-messages'),

  actions: {
    removeJob(job) {
      this.get('jobs').remove(job).then(() => {
        this.get('notifications').success('Job Deleted', {
          autoClear: true,
        });
      });
    },
  }
});
