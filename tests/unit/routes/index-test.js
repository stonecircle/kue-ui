import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('IndexRoute', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    var route = this.owner.lookup('route:index');
    assert.ok(route);
  });
});
