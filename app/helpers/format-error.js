import Ember from 'ember';

export function formatError(params/*, hash*/) {
  return params[0];
}

export default Ember.Helper.helper(formatError);
