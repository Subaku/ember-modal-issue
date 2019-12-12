import Route from '@ember/routing/route';

import { task } from 'ember-concurrency';


export default class IndexRoute extends Route{

  @task(function * () {
    return yield this.store.findAll('asset-location-summary');
  }).cancelOn('deactivate').restartable() fetchSummariesTask;


  model() {
    return { summariesTask: this.fetchSummariesTask.perform() };
  }
}
