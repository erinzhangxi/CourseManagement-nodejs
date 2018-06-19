var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByCredentials(username, password) {
    return userModel.findOne(
        {username: username, password: password},
        function(err, username) {
            if (err)  {
                throw error;
                console.log("cannot find user by credentials");
                console.log(username);
            }

        })
}

function findUserByUsername(username) {
    return userModel.findOne({username: username},
        function(err, username) {
            if (err) throw error;
            console.log("cannot find user by username");
            console.log(username);
        })
}

function deleteUser(userId) {
    return userModel.remove({_id:userId});
}

function updateUser(userId, newUser) {
    return userModel.update({_id: userId}, {$set:newUser});
}


var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    deleteUser: deleteUser,
    updateUser: updateUser,
    findUserByCredentials: findUserByCredentials,
    findUserByUsername: findUserByUsername
};

module.exports = api;