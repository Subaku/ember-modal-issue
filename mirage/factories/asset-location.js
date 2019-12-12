import * as moment from 'moment';
import { Factory } from 'ember-cli-mirage';

export default Factory.extend({

  assetCategory(i) {
    return i % 2 === 0 ? 'Tool' : 'Equipment';
  },

  whenSeen() {
    let now = moment.utc();
    let days = Math.floor(Math.random() * (25 - 1 + 1) + 1);
    let hours = Math.floor(Math.random() * (23 + 1));
    let minutes = Math.floor(Math.random() * (59 + 1));
    now.subtract(minutes, 'minutes');
    now.subtract(hours, 'hours');
    now.subtract(days, 'days');
    return now.format()
  },

  afterCreate(assetLocation, server) {
    let toUpdate = {};

    if (!assetLocation.asset) {
      toUpdate.asset = server.create('asset');
    }

    if (!assetLocation.location) {
      toUpdate.location = server.create('place');
    }

    if (!assetLocation.assignedTo) {
      toUpdate.assignedTo = server.create('place');
    }

    if (!assetLocation.seenBy) {
      toUpdate.seenBy = server.create('place');
    }
    assetLocation.update(toUpdate);
  }
});
