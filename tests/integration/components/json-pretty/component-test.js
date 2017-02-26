import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('json-pretty', 'Integration | Component | json pretty', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('data', {});

  this.render(hbs`{{json-pretty data=data}}`);

  assert.equal(this.$().text().trim(), '{ }');
});
