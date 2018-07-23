import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  jobs: service(),
    queryParams: {
        page: { refreshModel: true },
        order: { refreshModel: true },
        forceUpdate: { refreshModel: true },
    },

    model(params) {
        this.controllerFor('application').set('type', null);
        this.controllerFor('application').set('state', params.state);
        return this.jobs.find({
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
