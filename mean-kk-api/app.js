var createError  = require('http-errors');
var express      = require('express');
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');
var mongoose     = require('mongoose');

const keycloak = require ('./config/keycloak-config').initKeycloak ();

var indexRouter  = require('./routes/index');
var usersRouter  = require('./routes/users');
var boxesRouter  = require('./routes/boxes');
var complaintsRouter  = require('./routes/complaints');
var orgsRouter  = require('./routes/orgs');
var authRouter  = require('./routes/auth');



//require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

var app = express();

// -------------------------------------------------------------------------
//
// keycloak
//
// -------------------------------------------------------------------------
//app.use (keycloak.middleware);

// -------------------------------------------------------------------------
//
// Mongoose
//
// -------------------------------------------------------------------------
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://database:27017/meank').then(() => console.log ('Successfully Connected to MongoDB'));
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Cross Origin middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, x-access-token, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next()
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/boxes', boxesRouter);
app.use('/org', orgsRouter);
app.use('/complaint', complaintsRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
