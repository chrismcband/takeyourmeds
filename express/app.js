#!/usr/bin/env node

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , login = require('./routes/login')
  , reminder = require('./routes/reminder')
  , patients = require('./routes/patients')
  , drugs = require('./routes/drugs')
  , http = require('http')
  , path = require('path')
  , port = 8080
  , url  = 'http://localhost:' + port + '/';
/* We can access nodejitsu enviroment variables from process.env */
/* Note: the SUBDOMAIN variable will always be defined for a nodejitsu app */
if(process.env.SUBDOMAIN){
  url = 'http://' + process.env.SUBDOMAIN + '.jit.su/';
}
store  = new express.session.MemoryStore;
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});



//var patient1 = new Patient({
//    firstname: "Jeff",
//    lastname: "Smith",
//    dob: 0,
//    gender: 'male',
//    phone1: '+447723072947',
//    phone2: '+447723072947'
//});

//patient1.save(function(err){
//    if (err){
//        console.log('Unable to save patient1');
//    }
//});

//var db = require('./db');
//
//var Drug = db.Drug;
//
//var drug1 = new Drug({
//    name: 'Candesartan',
//    description: 'Angiotensin receptor blocker',
//    dosageInMG: '500',
//    type: 'pill'
//});
//
//drug1.save(function(err, drug){
//    if (err){
//        console.log("Unable to save drug 1");
//    }
//});

//var drug2 = new Drug({
//    name: 'Lansoprazole',
//    description: 'Proton-pump inhibitor',
//    dosageInMG: '30',
//    type: 'pill'
//});
//drug2.save(function(err, drug){
//    if (err){
//        console.log("Unable to save drug 2");
//    }
//});
//
//var drug3 = new Drug({
//    name: 'Metformin',
//    description: 'Blood glucose regulator',
//    dosageInMG: '500',
//    type: 'pill'
//});
//drug3.save(function(err, drug){
//    if (err){
//        console.log("Unable to save drug 3");
//    }
//});

app.get('/', routes.index);
app.get('/login', login.index);
app.post('/login', login.post);
app.get('/users', user.list);
app.get('/patients', patients.get);
app.post('/patients', patients.post);
app.get('/drugs', drugs.get);
app.post('/drugs', drugs.post);

app.get('/reminder', reminder.index);
app.post('/reminder', reminder.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
  console.log(url);
});