var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    user_id : { type: String , ref:'User' },
    sport_name: { type: String , ref:'Sport' },
    team_name: String,
    age_group: { type: String , ref:'Agegroup' },
    skill_level: { type: String , ref:'Skill' },
    location: String,
    latitude: String,
    longitude: String,
    gender: String,
    team_availbility_status: String,
    team_image:String,
    cover_image:String,
    status : String
},
    {
        timestamps: true
    });


var Team = mongoose.model('Team', teamSchema);
module.exports = Team;

module.exports.addNewTeam = function (params, callback) {
    console.log('addNewTeam paramsssss', params);
    var new_team = new Team(params);
    new_team.save(callback);
}


module.exports.getNearByTeams = function (params,callback) {
    // var latitude = parseFloat(params.latitude);
    // var longitude = parseFloat(params.longitude);
   Team.find({user_id : {$ne : params.user_id},status : 'A'},callback);
   // Team.find( { location : { $near : [ -73.9667, 40.78 ], $maxDistance: 16093.44 } },callback);
}


module.exports.getMyTeams = function (params,callback) {

    Team.find({user_id : params.user_id, status : 'A'})
    .populate('age_group')
    .populate('skill_level')
    .populate('sport_name')
    .exec(callback)
}


module.exports.getTeamDetail = function (params,callback) {

    Team.findById(params.team_id)
    .populate('user_id')
    .populate('age_group')
    .populate('skill_level')
    .populate('sport_name')
    .exec(callback)
}


module.exports.serachFilters = function (params,callback) {
    var q = {}; 
      q['$and']=[]; 
      if(params.sport != 'null'){ 
        q["$and"].push({ sport_name : params.sport}); 
      }
       if(params.skill_level != 'null'){ 
        q["$and"].push({ skill_level : params.skill_level}); 
      }
       if(params.age_group != 'null'){ 
        q["$and"].push({ age_group : params.age_group}); 
      }
      q["$and"].push({ user_id : {$ne : params.user_id}})
      q["$and"].push({ status : 'A'})
      console.log("hiiiii q ",q)
       Team.find(q)
       .populate('skill_level')
       .populate('sport_name')
       .populate('age_group')
       .exec(callback);

}



    module.exports.deleteMyTeam  = function(params,callback){
        Team.findByIdAndUpdate(params.team_id, {status : 'D'},{new:true} ,callback);
      }




  module.exports.editTeam  = function(id,params,callback){
      function clean(obj) {
            for (var propName in obj) {
              if (obj[propName] === null || obj[propName] === '' || obj[propName] === undefined) {
                delete obj[propName];
              }
            }
            console.log("obj is-----------",obj)
            return obj;
          }

      var update = clean(params);
      console.log("params is-----------",update)
      Team.findByIdAndUpdate(id, update,{new:true} ,callback);
    }
