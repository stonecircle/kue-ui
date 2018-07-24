import EmberRouter from '@ember/routing/router';
import config from './config/environment';

let rootURL = window.__kueUiExpress ? window.__kueUiExpress.rootUrl : config.rootURL;

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL,
});

Router.map(function() {
  this.route('jobs', function() {
      this.route('type', { path: "type/:type" });
      this.route('state', { path: "state/:state" });
      this.route('show', { path: ":id" });
      this.route('new', { path: "/new" });
  });
  this.route('history', function() {
    this.route('detail', {path: ":timestamp"});
  });
  this.route('login');
});

export default Router;
