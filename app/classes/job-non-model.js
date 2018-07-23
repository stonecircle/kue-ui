import { alias } from '@ember/object/computed';
import EmberObject from '@ember/object';

// TODO: remove this class when we can transition Job over to EmberData completely
var Job = EmberObject.extend({
  deleted: alias('isDestroyed'),
});

export default Job;
