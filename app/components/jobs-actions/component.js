import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  jobs: service(),
  notifications: service('notification-messages'),
  actions: {
    cancelSelected() {
      let numberOfJobs = 0;
      let promises = this.selectedJobs.map((job) => {
        numberOfJobs ++;
        this.jobs.updateState(job.id, 'failed')
      });

      Promise.all(promises).then(() => {
        this.notifications.success(`${numberOfJobs} Jobs Canceled`, {
          autoClear: true,
        });
        this.refresh();
      });
    }
  }
});
