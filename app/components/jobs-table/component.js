import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  order: null,

  allChecked: computed('jobs.@each.checked', function() {
    let jobs = this.jobs || [];

    if(!jobs.reduce) {
      return false;
    }

    return jobs.reduce((prev, job) => prev && job.checked, true);
  }),

  actions: {
    toggleArrow() {
      // eslint-disable-next-line ember/closure-actions
      this.sendAction('orderAction');
    },

    checkAll() {
      if (this.allChecked) {
        this.jobs.forEach(job => job.set('checked', false))
      } else {
        this.jobs.forEach(job => job.set('checked', true))
      }
    },

    checkOne(job) {
      this.jobs.forEach(job => job.set('checked', false));
      job.set('checked', true);
    }
  }
});
