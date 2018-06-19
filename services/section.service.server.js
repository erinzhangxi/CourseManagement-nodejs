module.exports = function (app) {
    app.post('/api/course', createCourse);
    app.post('/api/course/:courseId/section', createSection);
    app.delete('/api/section', removeSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
    app.get('/api/student/section', findSectionsForStudent);

    var sectionModel = require('../models/section/section.model.server');
    var courseModel = require('../models/course/course.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');

    function createCourse(req, res) {
        var course = req.body;
        courseModel
            .createCourse(course)
            .then(function (course) {
                res.json(course);
            })
    }

    function removeSection(req, res) {
        var section = req.body;
        sectionModel
            .removeSection(section)
            .then(function (section) {
                res.json(section);
            })
    }

    function findSectionsForStudent(req, res) {
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        enrollmentModel
            .findSectionsForStudent(studentId)
            .then(function(enrollments) {
                res.json(enrollments);
            });
    }

    function enrollStudentInSection(req, res) {
        var sectionId = req.params.sectionId;
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        var enrollment = {
            student: studentId,
            section: sectionId
        };

        sectionModel
            .decrementSectionSeats(sectionId)
            .then(function () {
                return enrollmentModel
                    .enrollStudentInSection(enrollment)
            })
            .then(function (enrollment) {
                res.json(enrollment);
            })
    }

    function findSectionsForCourse(req, res) {
        var courseId = req.params['courseId'];
        sectionModel
            .findSectionsForCourse(courseId)
            .then(function (sections) {
                res.json(sections);
            })
    }

    function createSection(req, res) {
        var section = req.body;
        sectionModel
            .createSection(section)
            .then(function (section) {
                res.json(section);
            })
    }
};