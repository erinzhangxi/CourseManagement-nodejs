var mongoose = require('mongoose');
var courseSchema = mongoose.Schema({
    name: String,
    courseId: String
}, {collection: 'course'});
module.exports = courseSchema;