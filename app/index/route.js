import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel(transition) {
        transition.abort();
        this.transitionTo('jobs.index');
    },

});
