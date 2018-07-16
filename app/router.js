import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: window.__kueUiExpress ? window.__kueUiExpress.rootUrl : config.rootURL
});

Router.map(function() {
  this.route('jobs', function() {
      this.route('type', { path: "type/:type" });
      this.route('state', { path: "state/:stateId" });
      this.route('show', { path: ":id" });
      this.route('new', { path: "/new" });
  });
  this.route('login');
});

export default Router;
