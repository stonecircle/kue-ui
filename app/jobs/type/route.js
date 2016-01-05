import Ember from 'ember';
import Job from '../../models/job';

export default Ember.Route.extend({

     queryParams: {
        page: { refreshModel: true },
        sort: { refreshModel: true },
        state: { refreshModel: true },
        order: { refreshModel: true }
    },

    model(params) {
        this.controllerFor('jobs.type').set('type', params.type);
        this.controllerFor('jobs.type').set('state', params.state);
        this.controllerFor('application').set('type', params.type);
        this.controllerFor('application').set('state', params.state);
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
