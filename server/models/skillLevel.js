var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var skillSchema = new Schema({
    skill:String
})

var Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;

module.exports.getSkill = function (callback) {
    Skill.find(callback);
}