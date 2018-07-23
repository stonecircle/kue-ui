import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  jobs: service(),

  model(params) {
    return this.jobs.findOne({
      id: params.id
    });
  }
});
