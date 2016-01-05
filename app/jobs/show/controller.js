import Ember from 'ember';

export default Ember.ObjectController.extend({

    actions: {
        removeJob(job) {
            job.remove().then(function() {
                console.log('job deleted', job);
            });
        },
    }
});
