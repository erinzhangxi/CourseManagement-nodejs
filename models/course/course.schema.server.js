var mongoose = require('mongoose');
var courseSchema = mongoose.Schema({
    name: String,
    courseId: Number,
    students: [String]

}, {collection: 'course'});
module.exports = courseSchema;