import Ember from 'ember';
import Job from 'client/models/job-non-model';

export default Ember.Component.extend({
    selections: Job.STATES,
    selectedState: null,

    sorts: Ember.A(['created_at', 'updated_at']),
    selectedSort: null,

});
