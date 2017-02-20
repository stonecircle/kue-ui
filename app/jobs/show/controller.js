import Ember from 'ember';

export default Ember.Controller.extend({
  jobs: Ember.inject.service(),
  notifications: Ember.inject.service('notification-messages'),

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
