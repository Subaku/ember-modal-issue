import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { isNone } from '@ember/utils';

import { task } from 'ember-concurrency';

import { parseWhenSeen, constructWhenSeen } from 'inventory/utils/query-params';
import {
  VISION_VALUES,
  TIME_TYPES,
  VISION_I,
  TIME_VALUE_I,
  TIME_TYPE_I
} from 'inventory/constants';


export default class Index extends Controller{
  queryParams = ['when_seen'];
  // Cached value
  _when_seen = null;

  visionOptions = VISION_VALUES
  timeTypes = TIME_TYPES

  // Seen, Not Seen, etc
  visionValue = null

  // 1, 55, 7, etc
  timeValue = null

  // hours, days, etc
  timeType = null


  /***** Getters ******/

  @computed('visionValue', 'timeValue', 'timeType')
  get when_seen() {
    let values = new Array(this.visionValue, this.timeValue, this.timeType);
    // To avoid the "churn" of a constantly changing parameter only update it when either all values
    // are null or all are not null. Gives user a chance to fully update their filter.
    if (values.every(item => isNone(item) || values.every(item => !isNone(item)))) {
      let cws = constructWhenSeen(this.visionValue, this.timeValue, this.timeType);
      return cws;
    }
    return this._when_seen;
  }

  set when_seen(value) {
    let parts = isNone(value) ? new Array() : parseWhenSeen(value);
    let valuesToSet = {}

    if (parts.every(part => isNone(part))) {
      valuesToSet = {visionValue: null, timeValue: null, timeType: null};
      this._when_seen = null;
    } else if (parts.length === 3 && parts.every(part => !isNone(part))) {
      valuesToSet = {
        visionValue: parts[VISION_I],
        timeValue: parts[TIME_VALUE_I],
        timeType: parts[TIME_TYPE_I]
      };
      this._when_seen = value;
    }

    for (const [attribute, value] of Object.entries(valuesToSet)) {
      if (this.get(attribute) !== value) {
        this.send(`${attribute}Changed`, value);
      }
    }
  }


  /***** Tasks ******/

  @task(function * (forLocation) {
    return yield this.store.query('asset-location', {
      location: forLocation.get('id')
    });
  }).restartable() fetchAssetLocationsTask;


  /***** Actions ******/

  @action
  visionValueChanged(value) {
    this.set('visionValue', value);
  }

  @action
  timeValueChanged(newValue) {
    this.set('timeValue', newValue);
  }

  @action
  timeTypeChanged(newType) {
    this.set('timeType', newType);
  }

  @action
  fetchAssetLocations(forLocation) {
    return this.fetchAssetLocationsTask.perform(forLocation);
  }
}
