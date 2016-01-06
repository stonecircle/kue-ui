import DS from 'ember-data';

const {
  Model,
  attr
} = DS;

export default Model.extend({
  type: attr('string'),
  priority: attr('number'),
  progress: attr('number'),
  state: attr('string'),
  created_at: attr('string'),
  promote_at: attr('string'),
  updated_at: attr('string'),
  started_at: attr('string'),
  duration: attr('number'),
  workerId: attr('string'),
  attempts: attr(),
  jobData: attr(),
});
