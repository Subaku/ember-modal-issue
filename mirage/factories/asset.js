import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name() {
    return faker.lorem.word();
  },

  assetType() {
    return faker.lorem.word();
  },

  assetId() {
    return faker.lorem.word();
  },

  value() {
    return Math.floor(Math.random() * 3000);
  }
});
