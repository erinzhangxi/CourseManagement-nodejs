module.exports = function (app) {
    app.post('/api/course', createCourse);
    app.post('/api/course/:courseId/section', createSection);
    app.delete('/api/section', removeSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
    app.post('/api/course/:courseId/enrollment', enrollStudentInCourse);
    app.get('/api/student/section', findSectionsForStudent);
    app.get('api/enrollment', findAllEnrollments);
    app.get('api/section/:sectionId', findSectionById);
    app.delete('/api/enrollment/:enrollmentId', unrollStudentInSection);

    var sectionModel = require('../models/section/section.model.server');
    var courseModel = require('../models/course/course.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');
    var userModel = require('../models/user/user.model.server');

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

        userModel
            .addSectionToUser(currentUser._id, sectionId)
            .then(function(user) {
                res.json(user);
            });
    }

    function enrollStudentInCourse(req, res) {
        var courseId = req.params.courseId;
        var currentUser = req.session.currentUser;

        var studentId = currentUser._id;

        userModel
            .addCourseToUser(currentUser._id, courseId)
            .then(function(user) {
                res.json(user);
            });
    }


    function unrollStudentInSection(req, res) {
        var enrollmentId = req.params.enrollmentID;

        sectionModel
            .incrementSectionSeats(sectionId)
            .then(function () {
                return enrollmentModel
                    .unrollStudentInSection(enrollment);
            })
            .then(function (enrollment) {
                res.json(enrollment);
            })

        userModel
            .removeSectionFromUser(currentUser._id, sectionId)
            .then(function(user) {
                res.json(user);
            });
    }

    function findSectionsForCourse(req, res) {
        var courseId = req.params['courseId'];
        sectionModel
            .findSectionsForCourse(courseId)
            .then(function (sections) {
                res.json(sections);
            })
    }

    function findSectionById(req, res) {
        var sectionId = req.params['sectionId'];
        sectionModel
            .findSectionById(sectionId)
            .then(function (section) {
            res.json(section);
        })
    }
    function findAllEnrollments(req, res) {
        enrollmentModel
            .findAllEnrollments()
            .then(function (enrollments) {
                res.json(enrollments);
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