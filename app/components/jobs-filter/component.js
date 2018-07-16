import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
    selections: alias('jobs.STATES'),
    jobs: service(),

    selectedState: null,

    sorts: A(['created_at', 'updated_at']),
    selectedSort: null,

});
