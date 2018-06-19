var mongoose = require('mongoose');
var courseSchema = require('./course.schema.server');
var courseModel = mongoose.model('CourseModel', courseSchema);

function createCourse(course) {
    return courseModel.create(course);
}



module.exports = {
    createCourse: createCourse
};