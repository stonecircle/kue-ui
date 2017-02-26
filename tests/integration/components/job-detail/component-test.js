import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { assertionInjector, assertionCleanup } from '../../../assertions';

moduleForComponent('job-detail', 'Integration | Component | job detail', {
  integration: true,
  beforeEach: function () {
    this.register('service:notification-messages', Ember.Service.extend({}));

    assertionInjector(this);
  },

  afterEach: function () {
    assertionCleanup(this);
  }
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('job', {});

  this.render(hbs`{{job-detail job=job}}`);

  assert.contains(this.$(), 'active');
});
