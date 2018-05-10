require('./globals');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const logger = require('morgan');
const createError = require('http-errors');
const admin = require('firebase-admin');
const firebaseConfig = require('../serviceAccountKey.json');
let firebaseAuth = require('./middleware/authentication');
let swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

// let resourceManager = require('./middleware/resourceManager');

const app = express();
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: appConfig.Firebase.DATABASE_URL
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', firebaseAuth(admin));

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