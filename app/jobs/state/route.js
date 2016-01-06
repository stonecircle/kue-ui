import Ember from 'ember';
import Job from '../../models/job-non-model';

export default Ember.Route.extend({
    queryParams: {
        page: { refreshModel: true },
        order: { refreshModel: true }
    },

    model(params) {
        this.controllerFor('application').set('type', null);
        this.controllerFor('application').set('state', params.stateId);
        return Job.find({
            state: params.stateId,
            page: params.page,
            order: params.order
        });
    },

    activate() {
        this._super();
        window.scrollTo(0,0);
    }

});
