import Ember from 'ember';
import AuthmakerLoginRoute from 'authmaker-ember-simple-auth/mixins/login-route';
import Config from 'client/config/environment';

export default Ember.Route.extend(AuthmakerLoginRoute, {
  config: Config.authMaker,
});
