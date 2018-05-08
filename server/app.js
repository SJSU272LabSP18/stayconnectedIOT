require('./globals');
const express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var router = require('./routes/router');
var logger = require('morgan');
var createError = require('http-errors');
var admin = require('firebase-admin');

const app = express();
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var firebaseConfig = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: appConfig.Firebase.DATABASE_URL
});

app.use('/', function (req, res, next) {
  var auth = req.get('Authorization');
  if (auth != null && auth != "") {
    admin.auth().verifyIdToken(auth)
        .then(function (decodedToken) {
          req.uid = decodedToken.uid;
          next();
        }).catch(function (error) {
        var err = createError(error.code, error.message);
        return next(err);
    });
  } else {
    var err = createError(401, "Unauthorized, missing Authorization header.");
    return next(err);
  }
});

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