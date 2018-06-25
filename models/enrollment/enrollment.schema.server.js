var mongoose = require('mongoose');
var enrollmentSchema = mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseModel'
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SectionModel'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    grade: String
}, {collection: 'enrollment'});
module.exports = enrollmentSchema;