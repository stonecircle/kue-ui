import { equal } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
    tagName: 'span',
    value: null,
    up: equal('value', 'asc'),

    click() {
        this.sendAction('action');
    }
});
