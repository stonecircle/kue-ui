import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {
        removeJob(job) {
            job.remove().then(function() {
                console.log('job deleted', job);
            });
        },
    }
});
