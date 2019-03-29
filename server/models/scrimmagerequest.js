var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scrimmageRequestSchema = new Schema({
    user_id                   : { type: String , ref:'User' },
    other_user_id             : { type: String , ref:'User' },
    team_id                   : { type: String , ref:'Team' },
    other_team_id             : { type: String , ref:'Team' },
    date_of_match             : Date,
    from_time                 : String,
    to_time                   : String,
    status                    : String
},
    {
        timestamps: true
    });


var ScrimmageRequest = mongoose.model('ScrimmageRequest', scrimmageRequestSchema);
module.exports = ScrimmageRequest;

module.exports.addNewScrimmageRequest = function (params, callback) {
    var new_request = new ScrimmageRequest(params);
    new_request.save(callback);
}


module.exports.getPendingRequests = function (params,callback) {
   ScrimmageRequest.find({other_user_id : params.user_id,status : 'P'})
   .populate({
    path: 'team_id',
    populate: { path: 'sport_name age_group skill_level' }
  })
   .populate('other_team_id','team_name')
   .exec(callback)
}


   module.exports.getUpcomingScrimmages  = function(params,callback){
       ScrimmageRequest.find({  $or : [
          { $and : [ {other_user_id : params.user_id}, {status : 'A'},{date_of_match: { "$gt": new Date()}} ] },
          { $and : [ {user_id : params.user_id}, {status : 'A'},{date_of_match: { "$gt": new Date()}} ] }
       ]})
      .populate({
                    path: 'team_id',
                    populate: { path: 'sport_name age_group skill_level' }
                    //match: { other_user_id: params.user_id }
                })
      .populate({
                    path: 'other_team_id',
                    populate: { path: 'sport_name age_group skill_level' }
                   // match: { user_id: params.user_id }
                })
      .exec(callback); 
    }


  module.exports.getCompletedScrimmages  = function(params,callback){
       ScrimmageRequest.find({  $or : [
          { $and : [ {other_user_id : params.user_id}, {status : 'A'},{date_of_match: { "$lte": new Date()}} ] },
          { $and : [ {user_id : params.user_id}, {status : 'A'},{date_of_match: { "$lte": new Date()}} ] }
       ]})
      .populate({
                    path: 'team_id',
                    populate: { path: 'sport_name age_group skill_level' }
                })
      .populate({
                    path: 'other_team_id',
                    populate: { path: 'sport_name age_group skill_level' }
                })
      .exec(callback); 
    }

    

    module.exports.acceptRejectRequest  = function(params,callback){
        ScrimmageRequest.findByIdAndUpdate(params.request_id, {status : params.status},{new:true} ,callback);
      }
