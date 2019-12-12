import DS from 'ember-data';
const { Model, attr } = DS;


export default class Place extends Model{
  @attr('string') name;
}
