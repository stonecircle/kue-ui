import Ember from 'ember';
import config from 'client/config/environment';
import moment from 'moment';

export default Ember.Route.extend({
  model() {
    return Ember.$.getJSON(`${config.apiURL}/stats/${moment().subtract(1, 'days').toDate().getTime()}`);
  }
});
