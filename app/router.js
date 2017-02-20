import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
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
  this.route('history', function() {
    this.route('detail', {path: ":timestamp"});
  });
  this.route('login');
});

export default Router;
