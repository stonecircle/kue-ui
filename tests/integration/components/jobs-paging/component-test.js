import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import {
  assertionInjector,
  assertionCleanup
} from '../../../assertions';

module('Integration | Component | jobs paging', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    assertionInjector(this);
  });

  hooks.afterEach(function () {
    assertionCleanup(this);
  });

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{jobs-paging}}`);

    assert.contains(this.$(), '← Previous');
  });
});
