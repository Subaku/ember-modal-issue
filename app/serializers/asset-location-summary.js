import DS from 'ember-data';
const { EmbeddedRecordsMixin } = DS;

import ApplicationSerializer from './application';

export default class AssetLocationSummarySerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
  attrs = {
    location: { embedded: 'always' }
  }
}
