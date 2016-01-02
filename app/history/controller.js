import Ember from 'ember';

export default Ember.Controller.extend({
  chartOptions: {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Fruit Consumption'
    },
    xAxis: {
      categories: ['Apples', 'Bananas', 'Oranges']
    },
    yAxis: {
      title: {
        text: 'Fruit eaten'
      }
    }
  },
  chartData: Ember.computed('model.complete.@each.length','model.failed.@each.length', function() {
    return [{
      name: 'Complete',
      data: Object.keys(this.get('model.complete')).map((item) => {
        return this.get(`model.complete.${item}.length`);
      })
    }, {
      name: 'Failed',
      data: Object.keys(this.get('model.failed')).map((item) => {
        return this.get(`model.failed.${item}.length`);
      })
    }];
  }),

});
