import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';
import { action, computed } from '@ember/object';

export default class AssetLocationSummaries extends Component {
  @readOnly('summariesTask.value') summaries;
  @readOnly('summariesTask.isRunning') isSummariesLoading;

  assetLocationsTask = null;
  @readOnly('assetLocationsTask.value') assetLocations;
  @readOnly('assetLocationsTask.isRunning') isAssetLocationsLoading;


  /***** Getters ******/

  @computed('summaries.[]')
  get summariesAsRows() {
    // Something about Ember-Data's RecordArray stuff throws Ember Table off...
    return this.summaries.toArray();
  }


  /***** Actions ******/

  @action
  viewAssetLocations(forLocation) {
    this.set('assetLocationsTask', this.get('fetchAssetLocations')(forLocation));
  }
}
