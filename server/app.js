require('./globals');
const express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var router = require('./routes/router');
var logger = require('morgan');
var createError = require('http-errors');

const keys = require('./config/keys');

const app = express();
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = createError(404, "Resource not found");
  return next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;