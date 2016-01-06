import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  model() {
    return this.store.query('stat', {since: moment().subtract(1, 'days').toDate().getTime()});
  }
});
