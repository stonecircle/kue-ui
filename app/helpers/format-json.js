import Ember from 'ember';

export function formatJson(params/*, hash*/) {
  var str = JSON.stringify(params[0], undefined, 2);
  return str.replace(/ /g, '&nbsp').htmlSafe();
}

export default Ember.Helper.helper(formatJson);
