var express = require('express')
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session = require('express-session')
mongoose.connect('mongodb://localhost/course-manager');

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'any string'
}));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/message/:theMessage', function (req, res) {
  var theMessage = req.params['theMessage'];
  res.send(theMessage);
})


var userService = require('./services/user.service.server');
userService(app);


require('./services/section.service.server')(app);

app.listen(4000)