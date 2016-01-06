import Ember from 'ember';
import moment from 'moment';

export function formatDate(params/*, hash*/) {
  return moment(Number(params[0])).format('DD/MM/YYYY HH:mm:ss');
}

export default Ember.Helper.helper(formatDate);
