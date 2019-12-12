import { click } from '@ember/test-helpers';


// Yes not exactly a override... but oh well...
export async function clickTrigger(scope, options = {}) {
  let selector = '.ember-power-select-trigger';
  if (scope) {
    selector = `${scope}${selector}`;
  }
  return click(selector, options);
}
