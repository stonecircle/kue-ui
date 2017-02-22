import Ember from 'ember';

export default Ember.Component.extend({
    selections: Ember.computed.alias('jobs.STATES'),
    jobs: Ember.inject.service(),

    selectedState: null,

    sorts: Ember.A(['created_at', 'updated_at']),
    selectedSort: null,

});
