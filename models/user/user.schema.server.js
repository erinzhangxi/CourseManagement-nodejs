var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    role: String,
    firstName: String,
    lastName: String,
    email: String,
    sections: [String],
    phone: String,
    address: String
}, {collection: 'user'});

module.exports = userSchema;