import { camelize } from '@ember/string';

import DRFSerializer from './drf';


export default class ApplicationSerializer extends DRFSerializer {
  keyForAttribute(attr/*, method */) {
    return camelize(attr);
  }
}
