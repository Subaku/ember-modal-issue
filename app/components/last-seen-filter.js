import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { isNone, isEmpty } from '@ember/utils';
import { A } from '@ember/array';
import { assert } from '@ember/debug';

import { defaultMatcher as defaultEPSMatcher } from 'ember-power-select/utils/group-utils';

import { parseTimeTerm, joinTimeParts } from '../utils/filter-utils';


const BACKSPACE_KEY = 8;


export default class LastSeenFilter extends Component {
  timePlaceholder = '7 days, 24 hours, ...'
  timeInstruction = 'Enter a number followed by \'hours\' or \'days\''


  /***** Lifecycle ******/

  didInsertElement() {
    // TODO: Move these to the constructor when we enable Octane Preview.
    let { onTimeValueChanged, onTimeTypeChanged, onVisionChanged } = this;
    assert('<LastSeenFilter> requires an `@onTimeValueChanged` function',
      onTimeValueChanged && typeof onTimeValueChanged === 'function');
    assert('<LastSeenFilter> requires an `@onTimeTypeChanged` function',
      onTimeTypeChanged && typeof onTimeTypeChanged === 'function');
    assert('<LastSeenFilter> requires an `@onVisionChanged` function',
      onVisionChanged && typeof onVisionChanged === 'function');
  }


  /***** Getters ******/

  @computed('timeValue', 'timeType')
  get selectedTimeExpression() {
    let { timeValue, timeType } = this;

    if (isEmpty(timeValue) || isNone(timeType) || isEmpty(timeType.trim())) {
      return A();
    }
    return A([`${this.timeValue} ${this.timeType.trim()}`]);
  }

  @computed('timeValue', 'timeTypes')
  get timeTypeOptions() {
    return isNone(this.timeValue) ? A() : this.timeTypes;
  }

  get timeNoMatchMsg() {
    return this.get('timeInstruction');
  }


  /***** Actions ******/

  @action
  onTimeChange(value) {
    if (value.length === 0) {
      this.onTimeTypeChanged(null);
      this.onTimeValueChanged(null);
      return;
    }

    // We allow user to select and effectively "swap" their time type.
    this.onTimeTypeChanged(value.length === 2 ? value[1] : value[0]);
  }

  @action
  timeTypeMatcher(timeType, searchTerm) {
    let opts = this.timeTypeOptions;
    if (opts.length === 0) {
      return -1;
    }

    let parts = parseTimeTerm(searchTerm);
    // Remember we add a space so trim it off
    return defaultEPSMatcher(timeType, parts[1].trimLeft());
  }

  @action
  onTimeInput(value) {
    // Prevents user from typing anything more if we've already got something selected
    if (!isEmpty(this.selectedTimeExpression)) {
      return '';
    }

    let [int, timePart] = parseTimeTerm(value);
    if (this.onTimeValueChanged) {
      this.onTimeValueChanged(Number.isInteger(int) ? int : null);
    }


    // Enable search to begin on timeType options
    let { timeValue } = this;
    let haveTimeValue = !isNone(timeValue) && Number.isInteger(timeValue);
    // User's typed a int + some int so start allowing them to see/filter for time type.
    return haveTimeValue && !isEmpty(timePart) ? joinTimeParts(int, timePart) : value;
  }

  @action
  onKeyThing(select, e) {
    // On backspace clear entire selection.
    if (e.keyCode === BACKSPACE_KEY) {
      this.onTimeTypeChanged(null);
      this.onTimeValueChanged(null);
    }
  }
}
