import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-currency', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with valid value', async function(assert) {
    this.set('value', '340');

    await render(hbs`{{format-currency value}}`);
    assert.equal(this.element.textContent.trim(), '$340');
  });

  test('it renders with zero', async function(assert) {
    this.set('value', '0');

    await render(hbs`{{format-currency value}}`);
    assert.equal(this.element.textContent.trim(), '$0');
  });

  test('it renders with inserted commas', async function(assert) {
    this.set('value', '1234567890');

    await render(hbs`{{format-currency value}}`);
    assert.equal(this.element.textContent.trim(), '$1,234,567,890');
  });

  test('it renders nothing if given null', async function(assert) {
    this.set('value', null);

    await render(hbs`{{format-currency value}}`);
    assert.equal(this.element.textContent.trim(), '');
  });
});
