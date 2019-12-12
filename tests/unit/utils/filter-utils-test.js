import { module, test } from 'qunit';

import { parseTimeTerm, joinTimeParts } from 'inventory/utils/filter-utils';


module('Unit | Utility | filter-utils | parseTimeTerm', function() {

  test('correctly parses apart the term', function(assert) {
    let [int, theRest] = parseTimeTerm('23thingie');
    assert.strictEqual(int, 23);
    assert.strictEqual(theRest, 'thingie');
  });

  test('correctly parses apart slightly more complicated term', function(assert) {
    let [int, theRest] = parseTimeTerm('23 and a one and a two');
    assert.strictEqual(int, 23);
    assert.strictEqual(theRest, ' and a one and a two');
  });

  test('correctly handles term not beginning with a number', function(assert) {
    let [int, theRest] = parseTimeTerm('a term');
    assert.strictEqual(int, null);
    assert.strictEqual(theRest, 'a term');
  });

  test('correctly handles term not having anything else but a number', function(assert) {
    let [int, theRest] = parseTimeTerm('32');
    assert.strictEqual(int, 32);
    assert.strictEqual(theRest, '');
  });

  test('returns empty values when given an empty string', function(assert) {
    let [int, theRest] = parseTimeTerm('');
    assert.strictEqual(int, null);
    assert.strictEqual(theRest, '');
  });
});


module('Unit | Utility | filter-utils | joinTimeParts', function() {
  test('correctly joins together the given data', function(assert) {
    assert.strictEqual(joinTimeParts(55, 'thingy thing'), '55 thingy thing');
  });

  test('handles the string part with extra white spaces', function(assert) {
    assert.strictEqual(joinTimeParts(55, '  thingy thing  '), '55 thingy thing');
  });
});
