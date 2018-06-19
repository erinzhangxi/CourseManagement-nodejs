var mongoose = require('mongoose');
var courseSchema = mongoose.Schema({
    name: String,
    courseId: Number
}, {collection: 'course'});
module.exports = courseSchema;