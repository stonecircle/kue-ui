import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['page'],
    page: Ember.computed(function(){return 1;}),

    actions: {

        goToJob: function(job) {
            this.transitionToRoute('jobs.show', job);
        },

        removeJob: function(job) {
            var self = this;
            job.remove().then(function() {
                self.get('model').removeObject(job);
            });
        },
    }
});
