import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('MenuTabsComponent', function(hooks) {
  setupTest(hooks);

  test('it renders', function(assert) {
    assert.expect(2);

    // creates the component instance
    var component = this.owner.factoryFor('component:menu-tabs').create();
    assert.equal(component._state, 'preRender');

    // appends the component to the page
    this.append();
    assert.equal(component._state, 'inDOM');
  });
});
