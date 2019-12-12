import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;


export default class AssetLocation extends Model{
  @belongsTo('asset') asset;
  @belongsTo('place') location;
  @belongsTo('place') assignedTo;
  @attr('string') assetCategory;
  @belongsTo('place') seenBy;
  @attr('date') whenSeen;
}
