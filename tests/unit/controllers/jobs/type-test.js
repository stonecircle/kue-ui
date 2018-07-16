import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('JobsTypeController', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    var controller = this.owner.lookup('controller:jobs/type');
    assert.ok(controller);
  });
});
