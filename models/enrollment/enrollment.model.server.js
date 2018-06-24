var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
    'EnrollmentModel',
    enrollmentSchema
);

function enrollStudentInSection(enrollment) {
    return enrollmentModel.create(enrollment);
}

function unrollStudentInSection(enrollment) {
    return enrollmentModel.delete(enrollment);
}

function findSectionsForStudent(studentId) {
    return enrollmentModel
        .find({student: studentId})
        .populate('section')
        .exec();
}
function findAllEnrollments() {
    return enrollmentModel.findAllEnrollments();
}

module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent,
    findAllEnrollments: findAllEnrollments,
    unrollStudentInSection: unrollStudentInSection
};