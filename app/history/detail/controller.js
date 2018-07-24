import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['state'],

  jobs: Ember.computed('state', 'model.completeJobs.[]', 'model.failedJobs.[]', function(){
    return this.get(`model.${Ember.String.camelize(`${this.get('state')}-jobs`)}`);
  })
});
