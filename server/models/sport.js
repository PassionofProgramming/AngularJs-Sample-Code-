var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sportSchema = new Schema({
    sport:String
})

var Sport = mongoose.model('Sport', sportSchema);
module.exports = Sport;

module.exports.getSports = function (callback) {
    Sport.find(callback);
}