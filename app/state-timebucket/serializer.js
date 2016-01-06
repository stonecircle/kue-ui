import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload){
    function jobIdToJob(jobId){
      return {
        type: "job",
        id: jobId
      };
    }

    var timestamps = Object.keys(payload.complete);

    //don't know if you need this
    if(!timestamps.length) {
      return {
        data: null
      };
    }

    if(timestamps.length === 1) {
      return {
        data: {
            type: "state-timebucket",
            id: timestamps[0],
            attributes: {
              complete: payload.complete[timestamps[0]].length,
              failed: payload.failed[timestamps[0]].length
            },
            relationships: {
              completeJobs: {
                data: payload.complete[timestamps[0]].map(jobIdToJob)
              },
              failedJobs: {
                data: payload.failed[timestamps[0]].map(jobIdToJob)
              }
            }
        }
      };
    }

    return {
      data: Object.keys(payload.complete).map(function(timeId){
        return {
          type: "state-timebucket",
          id: timeId,
          attributes: {
            complete: payload.complete[timeId].length,
            failed: payload.failed[timeId].length
          },
          relationships: {
            completeJobs: {
              data: payload.complete[timeId].map(jobIdToJob)
            },
            failedJobs: {
              data: payload.failed[timeId].map(jobIdToJob)
            }
          }
        };
      })
    };
  }
});
