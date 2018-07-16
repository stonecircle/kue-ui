import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { get } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  beforeModel(transition) {
    if (get(window, '__kueUiExpress.authmaker') && !this.get('session.isAuthenticated')) {
      let authenticationRoute = this.authenticationRoute;
      this.set('session.attemptedTransition', transition);
      return this.transitionTo(authenticationRoute);
    }
  }
});
