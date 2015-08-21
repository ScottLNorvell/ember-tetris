import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ttr-tetromino-square', 'Integration | Component | ttr tetromino square', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ttr-tetromino-square}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ttr-tetromino-square}}
      template block text
    {{/ttr-tetromino-square}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
