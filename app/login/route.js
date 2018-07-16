import Route from '@ember/routing/route';
import { get } from '@ember/object';
import AuthmakerLoginRoute from 'authmaker-ember-simple-auth/mixins/login-route';
import Config from '../config/environment';

export default Route.extend(AuthmakerLoginRoute, {
  config: get(window, '__kueUiExpress.authmaker') || Config.authMaker,
});
