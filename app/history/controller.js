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
          return parseInt(stat.id);
        }),
        labels: {
          formatter: function(){
            return moment(this.value).format('ddd HH');
          }
        }
      },
      yAxis: {
        title: {
          text: 'Job count'
        }
      },
      plotOptions:{
        column: {
          events: {
            click: (event) => {
              this.transitionToRoute('history.detail', event.point.category);
            }
          }
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
