var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var open = require('open');
var cors = require('cors');
const bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter= require('./routes/auth');
var listingRouter = require('./routes/listing');
var caseRouter = require('./routes/case');
var binRouter = require('./routes/bin');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// app.set('view engine', 'html');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(`${process.cwd()}\\build`));

app.use(express.static(path.join('D:\\dev\\research-redux\\project-launcher\\react\\build')));
  // app.use(express.static(`${process.cwd()}\\build`));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/list', listingRouter);
app.use('/bin', binRouter);
app.use('/case', caseRouter);





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

// setTimeout(() => {
//   open('http://127.0.0.1:9999', function (err) {
//   if ( err ) throw err;    
// });
// }, 1000);

module.exports = app;
