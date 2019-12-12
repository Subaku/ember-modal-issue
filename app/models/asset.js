import DS from 'ember-data';
const { Model, attr } = DS;

export default class Asset extends Model{
  @attr('string') name;
  @attr('string') assetType;
  @attr('string') assetId;
  @attr('number') value;
}
