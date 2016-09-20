import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    goToJob(job) {
        this.transitionTo('jobs.show', job);
    },
  }
});
