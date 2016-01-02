import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  chartOptions: Ember.computed(function() {
    return {

      chart: {
        type: 'column'
      },
      title: {
        text: 'Jobs by hour'
      },
      xAxis: {
        categories: Object.keys(this.get('model.complete')).map(function(item){
          console.log(item);
          return moment(parseInt(item)).format('ddd HH');
        })
      },
      yAxis: {
        title: {
          text: 'Job count'
        }
      }
    }
  }),
  chartData: Ember.computed('model.complete.@each.length', 'model.failed.@each.length', function() {
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
