import Ember from 'ember';
import Job from '../../models/job-non-model';

export default Ember.Route.extend({
  jobs: Ember.inject.service(),

  model(params) {
    return this.get('jobs').findOne({
      id: params.id
    });
  }
});
