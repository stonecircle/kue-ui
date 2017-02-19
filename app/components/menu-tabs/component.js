import Ember from 'ember';
import Job from 'client/models/job-non-model';

import _ from 'lodash';

export default Ember.Component.extend({
    breakdowns: Ember.A([]),
    selected: null,
    items: null,
    menuTree: [],
    // jobStates: Ember.A(Job.STATES),

    setScroll: Ember.on('didInsertElement', function() {
        Ember.$('.menu').perfectScrollbar();
    }),

    paramsDidChange: Ember.observer('typeParam', 'stateParam', 'menuTree', 'menuTree.[]', function(){
        this.updateActiveState();
    }),

    jobStates: Ember.computed('stats', 'stats.[]', function() {
        var states = Ember.A(Job.STATES);
        var stats = this.get('stats');
        if(Ember.isEmpty(stats)) return;
        return states.map(function(state) {
            return {
                state: state,
                count: stats[state+'Count']
            };
        });
    }),

    breakdownsDidLoad: Ember.observer('breakdowns', 'breakdowns.[]', function() {
        var breakdowns = this.get('breakdowns');
        var byType = _.groupBy(breakdowns, 'type');
        var menu = [];

        for(var type in byType) {
            var subItems = byType[type];
            menu.push({
                type: type,
                count: this.computeTotal(subItems),
                subItems: subItems
            });
        }
        this.set('menuTree', menu);
    }),

    computeTotal(arr) {
        return arr.reduce((acc, obj) => obj.count + acc, 0);
    },

    updateActiveState() {
        var selected = {
            state: this.get('stateParam'),
            type: this.get('typeParam'),
        };
        var items = this.get('menuTree');

        items.forEach(item => {
            Ember.set(item, 'active', item.type === selected.type);
            item.subItems.forEach(sub => {
                Ember.set(sub, 'active',  sub.state === selected.state && sub.type === selected.type);
                Ember.set(sub, 'hide', !item.active);
            });
            return item;
        });


        this.set('items', items);
    },

    actions: {
        goToItem(item) {
            this.sendAction("action", item);
        },

    }
});
