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
        categories: this.get('model').map(function(stat){
          return moment(parseInt(stat.id)).format('ddd HH');
        })
      },
      yAxis: {
        title: {
          text: 'Job count'
        }
      }
    };
  }),

  chartData: Ember.computed('model.@each.complete.[]', 'model.@each.failed.[]', function() {
    return [{
      name: 'Complete',
      data: this.get('model').map((stat) => {
        return stat.get('complete');
      })
    }, {
      name: 'Failed',
      data: this.get('model').map((stat) => {
        return stat.get('failed');
      })
    }];
  }),

});
