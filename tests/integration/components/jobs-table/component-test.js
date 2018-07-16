import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import {
  assertionInjector,
  assertionCleanup
} from '../../../assertions';

moduleForComponent('jobs-table', 'Integration | Component | jobs table', {
  integration: true,
  beforeEach: function () {
    assertionInjector(this);
  },

  afterEach: function () {
    assertionCleanup(this);
  }
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{jobs-table}}`);

  assert.contains(this.$(), 'No results');
});
