import DS from 'ember-data';

const {
  Model,
  hasMany,
  attr
} = DS;

export default Model.extend({
  complete: attr('number'),
  failed: attr('number'),
  completeJobs: hasMany('job'),
  failedJobs: hasMany('job')
});
