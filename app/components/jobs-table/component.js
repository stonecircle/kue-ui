import { gt } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
    selectedJob: null,
    hasSelectedJob: gt('selectedJob.id.length', 0),
    order: null,

    actions: {
        showDetail(job) {
            this.set('selectedJob', job);
            this.jobs.setEach('active', false);
            job.set('active', true);
        },

        toggleArrow() {
          // eslint-disable-next-line ember/closure-actions
          this.sendAction('orderAction');
        }
    }
});
