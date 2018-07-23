import DS from 'ember-data';

const {
  Model,
  attr,
} = DS;

export default Model.extend({
  attempts: attr(),
  created_at: attr('string'),
  duration: attr('number'),
  error: attr('string'),
  jobData: attr(),
  priority: attr('number'),
  progress: attr('number'),
  promote_at: attr('string'),
  started_at: attr('string'),
  state: attr('string'),
  type: attr('string'),
  updated_at: attr('string'),
  workerId: attr('string'),
});
