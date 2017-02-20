import Ember from 'ember';

export default Ember.Route.extend({
  jobs: Ember.inject.service(),

  model(params) {
    return this.get('jobs').findOne({
      id: params.id
    });
  }
});
