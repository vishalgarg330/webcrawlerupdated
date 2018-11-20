var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongodb=require('mongodb');
var mongoose=require('mongoose');
var session=require('express-session');
var flash=require('connect-flash');
var mongoDb = require('connect-mongo')(session);
var index = require('./routes/index');
var models=require('./models');
let RssFeedEmitter = require('rss-feed-emitter');
let feeder = new RssFeedEmitter();
var MongoClient = require('mongodb').MongoClient;
var constants= require('./constants');
var controllers =require('./controllers');
var app = express();


var mongoConnectionUrl = constants.constant.mongoConnectionUrl;


mongoose.connect(mongoConnectionUrl, {useNewUrlParser: true});

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
        secret: 'vishalgarg'
    })
);

var response =constants.constant.categoryurls;

function savenewsindb(){
    for(i=0;i<response.length;i++){
        feeder.add({
                url: response[i].url,
                refresh: 2000
            }
        )};
        feeder.on('new-item',function (item) {
            controllers.newsfeed.savenewsindb(item,function (err,res) {
                if(err){
                    res.send(err);
                }
            })

        });
}
savenewsindb();



app.use(flash());
app.use('/', index);

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
