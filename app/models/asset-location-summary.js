import { computed } from '@ember/object';
import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;


export default class AssetLocationSummary extends Model{
  @belongsTo('place') location;
  @attr('number') assets;
  @attr('number') assignedAssets;
  @attr('number') assetValue;
  @attr('number') assignedAssetValue;


  @computed('assignedAssets')
  get nonAssignedAssets() {
    return this.get('assets') - this.get('assignedAssets');
  }

  @computed('assignedAssetValue')
  get nonAssignedAssetValue() {
    return this.get('assetValue') - this.get('assignedAssetValue');
  }
}
