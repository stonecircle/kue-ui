import DS from 'ember-data';
import config from 'client/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: config.apiURL,
});
