import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { typeInSearch } from 'ember-power-select/test-support/helpers';

import { clickTrigger } from '../../helpers/eps-helper-overrides';
import { joinTimeParts } from 'inventory/utils/filter-utils';
import { visionOptions, timeTypes } from './constants';


module('Integration | Component | last-seen-filter', function(hooks) {
  setupRenderingTest(hooks);

  let timeTypeSelectTrigger = '.time-type-select';
  let timeTypeSelectDropdown = '.time-type-select-dropdown';
  let visionSelectTrigger = '.vision-select';
  // let visionSelectDropdown = '.vision-select-dropdown';
  let noTimeTypeMsg = 'Enter a number followed by \'hours\' or \'days\'';

  test('renders with values', async function(assert) {
    assert.expect(2);

    this.visionOptions = visionOptions;
    this.timeTypes = timeTypes;
    this.visionValue = this.visionOptions[0];
    this.timeType = this.timeTypes[0];
    this.timeValue = 32;

    await render(hbs`
      <LastSeenFilter
        @visionOptions={{visionOptions}}
        @timeTypes={{timeTypes}}
        @visionValue={{visionValue}}
        @timeValue={{timeValue}}
        @timeType={{timeType}}
        @onTimeValueChanged={{action (mut timeValue)}}
        @onTimeTypeChanged={{action (mut timeType)}}
        @onVisionChanged={{action (mut visionValue)}}/>
    `);

    assert.dom(visionSelectTrigger).includesText(this.visionValue);
    assert.dom(timeTypeSelectTrigger).includesText(joinTimeParts(this.timeValue, this.timeType));
  });

  test('only allows selection of time type once user enters first a number', async function(assert) {
    assert.expect(5);
    this.timeTypes = timeTypes;

    await render(hbs`
      <LastSeenFilter
        @timeTypes={{timeTypes}}
        @timeValue={{timeValue}}
        @timeType={{timeType}}
        @onTimeValueChanged={{action (mut timeValue)}}
        @onTimeTypeChanged={{action (mut timeType)}}
        @onVisionChanged={{action (mut visionValue)}}/>
    `);

    let optionsSelector = `${timeTypeSelectDropdown} .ember-power-select-option`;
    await clickTrigger(timeTypeSelectTrigger);
    assert.dom(optionsSelector).includesText(noTimeTypeMsg);

    await typeInSearch(timeTypeSelectTrigger, 'ello');
    assert.dom(optionsSelector).includesText(noTimeTypeMsg);

    await typeInSearch(timeTypeSelectTrigger, 10);
    assert.dom(optionsSelector).doesNotIncludeText(noTimeTypeMsg);
    assert.dom(`${optionsSelector}:nth-child(1)`).includesText(this.timeTypes[0]);
    assert.dom(`${optionsSelector}:nth-child(2)`).includesText(this.timeTypes[1]);
  });

  test('user is not allowed to select more than one thing', async function(assert) {
    assert.expect(1);
    this.timeTypes = timeTypes;

    await render(hbs`
      <LastSeenFilter
        @timeTypes={{timeTypes}}
        @timeValue={{timeValue}}
        @timeType={{timeType}}
        @onTimeValueChanged={{action (mut timeValue)}}
        @onTimeTypeChanged={{action (mut timeType)}}
        @onVisionChanged={{action (mut visionValue)}}/>
    `);

    await clickTrigger(timeTypeSelectTrigger);
    await typeInSearch(timeTypeSelectTrigger, 5);

    let optionsSelector = `${timeTypeSelectDropdown} .ember-power-select-option`;
    await click(`${optionsSelector}:nth-child(1)`);

    let optionSelector = `${timeTypeSelectTrigger} .ember-power-select-multiple-option`;
    assert.dom(optionSelector).includesText('5 days');
  });
});
