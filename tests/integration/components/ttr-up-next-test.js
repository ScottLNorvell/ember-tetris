import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ttr-up-next', 'Integration | Component | ttr up next', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ttr-up-next}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ttr-up-next}}
      template block text
    {{/ttr-up-next}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
