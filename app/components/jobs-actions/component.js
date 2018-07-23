import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

const allowedStates = ['failed', 'inactive'];

export default Component.extend({
  jobs: service(),
  notifications: service('notification-messages'),
  actions: {
    updateSelected(newState) {
      if (!allowedStates.includes(newState)) {
        this.notifications.error(`Allow states are [${allowedStates.join(', ')}] which does not include ${newState}`);
        return;
      }

      let numberOfJobs = 0;
      let promises = this.selectedJobs.map((job) => {
        numberOfJobs ++;
        this.jobs.updateState(job.id, newState)
      });

      Promise.all(promises).then(() => {
        this.notifications.success(`${numberOfJobs} Jobs set to ${newState}`, {
          autoClear: true,
        });

        later(this, () => this.refresh(), 300);
      });
    },
  }
});
