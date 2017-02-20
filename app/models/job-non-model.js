import Ember from 'ember';

// TODO: remove this class when we can transition Job over to EmberData completely
var Job = Ember.Object.extend({
  deleted: Ember.computed.alias('isDestroyed'),
});

export default Job;
