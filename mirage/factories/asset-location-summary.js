import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  summary: 'thing',

  assets() {
    return Math.floor(Math.random() * 30);
  },

  assignedAssets() {
    return Math.floor(Math.random() * this.assets);
  },

  assetValue() {
    return Math.floor(Math.random() * 300000);
  },

  assignedAssetValue() {
    return Math.floor(Math.random() * this.assetValue);
  },

  afterCreate(assetLocation, server) {
    assetLocation.update({location: server.create('place')});
  }
});
