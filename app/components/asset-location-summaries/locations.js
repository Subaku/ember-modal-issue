import Component from '@ember/component';
import { empty, not } from '@ember/object/computed';
// import { computed } from '@ember/object';
// import { isEmpty } from '@ember/utils';


export default class Locations extends Component {
  @empty('locations') noLocations;
  @not('noLocations') showModal;

  // @computed('locations.[]')
  // get showModal() {
  //   let value = !isEmpty(this.get('locations'));
  //   console.log(value);
  //   return value;
  // }
}
