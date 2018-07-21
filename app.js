var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Start database
/* Database configuration */
const config = require('./modules/config');
let conf = new config();
/* Init database */
conf.init();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/client');
var policiesRouter = require('./routes/policy');
var app = express();

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/client', usersRouter);
app.use('/policy', policiesRouter);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./static/swagger.json');
app.use('/api-docs', swaggerUi.serve,
  swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    response.writeHead(500, {
      'Content-Type': 'text/plain'
    });
    response.end(err.message);

    // res.status(err.status || 500);
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
  });
}

// production error handler no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;