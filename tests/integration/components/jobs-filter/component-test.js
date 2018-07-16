import Service from '@ember/service';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import {
  assertionInjector,
  assertionCleanup
} from '../../../assertions';

moduleForComponent('/jobs-filter', 'Integration | Component | jobs filter', {
  integration: true,
  beforeEach: function () {
    this.register('service:notification-messages', Service.extend({}));

    assertionInjector(this);
  },

  afterEach: function () {
    assertionCleanup(this);
  }
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{jobs-filter}}`);

  assert.contains(this.$(), 'Previous');

  // Template block usage:
  this.render(hbs`
    {{#jobs-filter}}
      template block text
    {{/jobs-filter}}
  `);

  assert.contains(this.$(), '← Previous');
});
