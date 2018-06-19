module.exports = function (app) {
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.post('/api/user', createUser); // register
    app.post('/api/login', login);
    app.get('/api/profile', profile);
    app.post('/api/logout', logout);
    app.put('/api/profile', updateProfile);

    var userModel = require('../models/user/user.model.server');

    function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function updateProfile(req, res) {
        var user = req.body;

        userModel.updateUser(user._id, user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function profile(req, res) {
        res.send(req.session['currentUser']);
    }

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function login(req, res) {
        var user = req.body;
        userModel.findUserByCredentials(user.username, user.password)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }
}