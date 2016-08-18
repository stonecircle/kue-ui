import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'span',
    value: null,
    up: Ember.computed.equal('value', 'asc'),

    click() {
        this.sendAction('action');
    }
});
