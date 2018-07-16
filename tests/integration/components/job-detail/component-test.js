import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import {
  assertionInjector,
  assertionCleanup
} from '../../../assertions';

module('Integration | Component | job detail', function(hooks) {
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

    this.set('job', {});

    await render(hbs`{{job-detail job=job}}`);

    assert.contains(this.$(), 'active');
  });
});
