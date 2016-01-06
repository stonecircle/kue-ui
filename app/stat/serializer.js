import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload){
    function jobIdToJob(jobId){
      return {
        type: "job",
        id: jobId
      };
    }

    return {
      data: Object.keys(payload.complete).map(function(timeId){
        return {
          type: "stat",
          id: timeId,
          attributes: {
            complete: payload.complete[timeId].length,
            failed: payload.failed[timeId].length
          },
          relationships: {
            completeJobs: payload.complete[timeId].map(jobIdToJob),
            failedJobs: payload.failed[timeId].map(jobIdToJob)
          }
        };
      })
    };
  }
});
