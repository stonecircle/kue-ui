import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  beforeModel(transition) {
    if (get(window, '__kueUiExpress.authmaker') && !this.get('session.isAuthenticated')) {
      let authenticationRoute = this.get('authenticationRoute');
      this.set('session.attemptedTransition', transition);
      return this.transitionTo(authenticationRoute);
    }
  }
});
