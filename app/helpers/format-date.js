import Ember from 'ember';
import moment from 'moment';

export function formatDate(date) {
  return moment(Number(date)).format('DD/MM/YYYY HH:mm:ss');
}

export default Ember.Handlebars.makeBoundHelper(formatDate);
