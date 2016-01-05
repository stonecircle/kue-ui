import Ember from 'ember';

export default Ember.Component.extend({

    printJSON() {
       var data = this.get('data');
        Ember.$("#json").JSONView(JSON.stringify(data));
    },

    didInsertElement() {
        this.printJSON();
    },

    jobDidChange: Ember.observer('data', function() {
        this.printJSON();
    })
});
