import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import {
  assertionInjector,
  assertionCleanup
} from '../../../assertions';

module('Integration | Component | jobs filter', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:notification-messages', Service.extend({}));

    assertionInjector(this);
  });

  hooks.afterEach(function () {
    assertionCleanup(this);
  });

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{jobs-filter}}`);

    assert.contains(this.$(), 'Previous');

    // Template block usage:
    await render(hbs`
      {{#jobs-filter}}
        template block text
      {{/jobs-filter}}
    `);

    assert.contains(this.$(), '← Previous');
  });
});
