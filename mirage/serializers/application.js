import { RestSerializer } from 'ember-cli-mirage';

export default class ApplicationSerializer extends RestSerializer {
  root = false;

  typeKeyForModel(model) {
    return model.modelName;
  }

  // alwaysIncludeLinkageData = true;
}
