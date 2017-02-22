import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  model() {
    return this.store.query('state-timebucket', {since: moment().subtract(1, 'days').toDate().getTime()});
  }
});
