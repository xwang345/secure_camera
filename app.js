var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const clientSessions = require("client-sessions");
const bcrypt = require('bcryptjs');

var indexRouter = require('./routes/index');
var imagesRouter = require('./routes/images');
//
var app = express();

app.setSocketIo = function(socket, io) {
    indexRouter.setSocketIo(socket, io);
    imagesRouter.setSocketIo(socket, io);
}

const user = {
    username: ""
  };
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static('node_modules'));

app.use('/', indexRouter);
app.use('/images', imagesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

app.use(clientSessions({
    cookieName: 'session', // cookie name dictates the key name added to the request object
    secret: 'home_security', // should be a large unguessable string
    duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
    activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
  }));

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;