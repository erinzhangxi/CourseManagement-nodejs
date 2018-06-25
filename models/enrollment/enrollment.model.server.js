var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
    'EnrollmentModel',
    enrollmentSchema
);

function enrollStudentInSection(enrollment) {
    return enrollmentModel.create(enrollment);
}

function enrollStudentInCourse(enrollment) {
    return enrollmentModel.create(enrollment);
}

function unrollStudentInSection(enrollmentId) {
    return enrollmentModel.deleteOne({_id: enrollmentId});
}

function findSectionsForStudent(studentId) {
    return enrollmentModel
        .find({student: studentId})
        .populate('section')
        .exec();
}

function findCoursesForStudent(studentId) {
    return enrollmentModel
        .find({student: studentId})
        .populate('course')
        .exec();
}

function findAllEnrollments() {
    return enrollmentModel.findAllEnrollments();
}

module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent,
    findAllEnrollments: findAllEnrollments,
    unrollStudentInSection: unrollStudentInSection,
    findCoursesForStudent: findCoursesForStudent,
    enrollStudentInCourse: enrollStudentInCourse
};