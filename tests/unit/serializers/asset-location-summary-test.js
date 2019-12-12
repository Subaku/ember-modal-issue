import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | asset location summary', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('asset-location-summary');

    assert.ok(serializer);
  });

  // let assertData = function(expected, actual, assert) {
  //   console.log(expected, actual);
  //   assert.strictEqual(expected.location ? expected.location.id : null, actual.id);
  //   assert.deepEqual(expected.location, actual.location);
  //   assert.strictEqual(expected.assets, actual.assets);
  //   assert.strictEqual(expected.assetValue, actual.assetValue);
  //   assert.strictEqual(expected.assignedAssets, actual.assignedAssets);
  //   assert.strictEqual(expected.assignedAssetValue, actual.assignedAssetValue);
  // }

  // test('it serializes records with embedded location', function(assert) {
  //   let store = this.owner.lookup('service:store');
  //   let model = store.modelFor('asset-location-summary');
  //
  //   let expected = {
  //     location: {
  //       id: "5",
  //       name: 'Some Location'
  //     },
  //     assets: 12,
  //     assignedAssets: 5,
  //     assetValue: 100,
  //     assignedAssetValue: 25
  //   }
  //
  //   let serializer = store.serializerFor('asset-location-summary');
  //   let record = store.push(serializer.normalizeResponse(store, model, expected, null, 'findRecord'));
  //   assertData(expected, record.serialize(), assert)
  // });

  // test('it serializes records with no location', function(assert) {
  //   let store = this.owner.lookup('service:store');
  //
  //   let expected = {
  //     location: null,
  //     assets: 12,
  //     assignedAssets: 5,
  //     assetValue: 100,
  //     assignedAssetValue: 25
  //   }
  //
  //   let record = store.createRecord('asset-location-summary', expected);
  //
  //   let serializedRecord = record.serialize();
  //   console.log(serializedRecord);
  //   assertData(expected, serializedRecord, assert)
  // });
});
