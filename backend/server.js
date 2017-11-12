var mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    express = require('express'),
    app = express(),
    Word = require('./models/word.model'),
    User = require('./models/user.model'),
    Match = require('./models/match.model'),
    port = process.env.PORT || 8080,
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    mongoUrl = "mongodb://root:root_1@ds255715.mlab.com:55715/heroku_gknnkhkt";

mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

//importing routes
var routeWords = require('./routes/words.route');
routeWords(app);
var routeUsers = require('./routes/users.route');
routeUsers(app);
var routeMatches = require('./routes/matches.route');
routeMatches(app);

app.listen(port);
console.log('trendswar RESTful API server started on: ' + port);