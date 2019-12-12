import DRFAdapter from './drf';

export default class ApplicationAdapter extends DRFAdapter {
  pathForType(type) {
    // No pluralization
    return type;
  }
}
