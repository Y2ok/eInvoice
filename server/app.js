/**
 * Include all necessary libraries.
 */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const cors = require('cors')
const passport = require('passport');
const config = require('./config');
const response = require('./helpers/response');
const LocalStrategy = require('passport-local').Strategy;
const helmet = require('helmet');


/**
 * Load all necessary controllers.
 */
const authenticationController = require('./controllers/authentication');

/**
 * Load all routes.
 */
const routes = require('./routes');

/**
 * Create application and set settings.
 */
const app = express();

// General settings
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cors());
app.use(expressSession({
    secret: config.secretToken,
    resave: false,
    saveUninitialized: false
}));
app.use(helmet()); // For security purpose

// Settings required for validator
app.use(validator());

// Settings required for passport
app.use(passport.initialize());
app.use(passport.session());

// Set routing for application
app.use('/', routes);

/**
 * Passport.JS setup.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, authenticationController.authentication));
passport.serializeUser(authenticationController.serializeUser);
passport.deserializeUser(authenticationController.deserializeUser);

/**
 * Setup error handling.
 */

// Catch and forward 404 error
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  const message = {
    error: 'Not found!'
  };
  return response.reportMessage(err.status, message, res);
});

// Setup error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.status === 401) {
    const message = {
      error: 'Not authorized!'
    };
    return res.status(err.status || 500).json(message);
  } else {
    const message = {
      error: err.errors ? err.errors : 'Unexpected error!'
    }
    return res.status(err.status || 500).json(message);
  }
});

module.exports = app;
