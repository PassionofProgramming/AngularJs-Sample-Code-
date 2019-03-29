var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ageGroup = new Schema({
    agegroup:String
})

var Agegroup = mongoose.model('Agegroup', ageGroup);
module.exports = Agegroup;

module.exports.getAgeGroup = function (callback) {
    Agegroup.find(callback);
}