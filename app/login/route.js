import Ember from 'ember';
import AuthmakerLoginRoute from 'authmaker-ember-simple-auth/mixins/login-route';
import Config from '../config/environment';

const { Route, get } = Ember;

export default Route.extend(AuthmakerLoginRoute, {
  config: get(window, '__kueUiExpress.authmaker') || Config.authMaker,
});
