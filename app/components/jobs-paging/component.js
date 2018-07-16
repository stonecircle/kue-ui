import Component from '@ember/component';

export default Component.extend({

    page: 1,

    actions: {
        next() {
            this.incrementProperty('page');
        },

        previous() {
            if(this.get('page') > 1) {
              this.decrementProperty('page');
            }
        }
    }

});
