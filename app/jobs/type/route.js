import Ember from 'ember';
import Job from '../../models/job-non-model';

export default Ember.Route.extend({

     queryParams: {
        page: { refreshModel: true },
        sort: { refreshModel: true },
        state: { refreshModel: true }
    },

    model(params) {
        this.controllerFor('jobs.type').set('type', params.type);
        this.controllerFor('application').set('type', params.type);
        return Job.find({
            type: params.type,
            state: params.state,
            page: params.page,
            order: params.order
        });
    },

    activate() {
        this._super();
        window.scrollTo(0,0);
    }

});
