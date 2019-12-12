import { helper } from '@ember/component/helper';
import { isNone, isEmpty } from '@ember/utils';

const SIGN = '$';

export default helper(function formatCurrency([value]) {
  if (isNone(value)) {
    return '';
  }

  if (value > 999) {
    let asStr = value.toString();
    let reversed = asStr.split('').reverse().join('');
    // Regex includes matches but we gotta filter out empty strings from split
    let justDigitsAsStr = reversed.split(/(\d{3})/).filter(part => !isEmpty(part));
    value = justDigitsAsStr.join(',').split('').reverse().join('');
  }

  return `${SIGN}${value}`;
});
