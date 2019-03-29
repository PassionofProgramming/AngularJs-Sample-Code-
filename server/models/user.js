var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    register_type: String,
    social_media_id: String,
    profile_image: String,
    team_availbility_status: String,
    status: String,
    token: String
},
    {
        timestamps: true
    });

var User = mongoose.model('User', userSchema);
module.exports = User;

module.exports.addNewUser = function (params, callback) {
    console.log('paramsssss', params);
    var new_user = new User(params);
    new_user.save(callback);
}

module.exports.checkEmailExistSignup = function (params, callback) {
    User.find({ email: params.email }, {}, callback);
}


module.exports.checkEntrySocial = function (params, callback) {
    User.find({ social_media_id: params.social_media_id }, {}, callback);
}


module.exports.updateSocialSignup = function (id, params, callback) {
    console.log('paramsssss', params);
    function clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === '' || obj[propName] === undefined) {
                delete obj[propName];
            }
        }
        console.log("obj is-----------", obj)
        return obj;
    }

    var update = clean(params);
    console.log("params is-----------", update)
    User.findByIdAndUpdate(id, update, callback);
}

module.exports.verifyUser = function (params, callback) {
    console.log('update paramsssss', params)
    User.findOneAndUpdate({ token: params.signupToken }, params, { new: true }, callback);
}



module.exports.Login = function (params, callback) {
    console.log('Login paramss', params);
    User.findOne({ email: params.email }, callback);
}

module.exports.updateInfo = function (id, params, callback) {
    console.log("in model updateInfo of login ", params)
    var update = {
        // latitude       : params.latitude,
        // longitude      : params.longitude,
        access_token: params.access_token,
        time_zone: params.time_zone,
        device_id: params.device_id,
        device_type: params.device_type
    }
    function clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === '' || obj[propName] === undefined) {
                delete obj[propName];
            }
        }
        console.log(obj);
        return obj;
    }

    var update = clean(update);
    console.log("update ", update)
    User.findByIdAndUpdate(id, update, { new: true }, callback);
}


module.exports.setToken = function (params, callback) {
    console.log('setToken paramss', params);
    User.findOneAndUpdate({ email: params.email },params, callback);
}

module.exports.getPassword = function (params, callback) {
    console.log('getPassword paramss', params);
    User.find({ token: params.token }, callback);
}

module.exports.resetPassword = function (params, callback) {
    console.log('resetPassword paramss', params);
    User.findOneAndUpdate({token:params.token},params,{new:true}, callback);
}





/////////////////////////// ADMIN PANEL /////////////////////////

module.exports.getUsers = function (callback) {

    User.find({}, {}, callback);
}

