import { observer } from '@ember/object';
import $ from 'jquery';
import Component from '@ember/component';

export default Component.extend({

    printJSON() {
       var data = this.data;
        $("#json").JSONView(JSON.stringify(data));
    },

    didInsertElement() {
        this.printJSON();
    },

    jobDidChange: observer('data', function() {
        this.printJSON();
    })
});
