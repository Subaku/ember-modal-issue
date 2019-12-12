import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | index', function(hooks) {
  setupTest(hooks);

  test('updates timeValue on timeValueChanged action', function(assert) {
    let controller = this.owner.lookup('controller:index');

    assert.strictEqual(controller.get('timeValue'), null)
    controller.send('timeValueChanged', 100);
    assert.strictEqual(controller.get('timeValue'), 100)
  });

  test('updates timeType on timeTypeChanged action', function(assert) {
    let controller = this.owner.lookup('controller:index');

    assert.strictEqual(controller.get('timeType'), null)
    controller.send('timeTypeChanged', 'days');
    assert.strictEqual(controller.get('timeType'), 'days')
  });

  test('updates visionValue on visionValueChanged action', function(assert) {
    let controller = this.owner.lookup('controller:index');

    assert.strictEqual(controller.get('visionValue'), null)
    controller.send('visionValueChanged', 'Seen');
    assert.strictEqual(controller.get('visionValue'), 'Seen')
  });
});
