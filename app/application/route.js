import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    goToJob(job) {
        this.transitionTo('jobs.show', job);
    },
  }
});
