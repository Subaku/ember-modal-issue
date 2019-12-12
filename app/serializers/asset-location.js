import DS from "ember-data";
import ApplicationSerializer from './application';

const { EmbeddedRecordsMixin } = DS;


export default class AssetLocationSerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
  attrs = {
    asset: { embedded: 'always' },
    location: { embedded: 'always' },
    assignedTo: { embedded: 'always' },
    seenBy: { embedded: 'always' },
  }
}
