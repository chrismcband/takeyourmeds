#!/usr/bin/env node

/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , users = require('./routes/users')
    , session = require('./routes/session')
    , reminder = require('./routes/reminder')
    , patients = require('./routes/patients')
    , drugs = require('./routes/drugs')
    , courses = require('./routes/courses')
    , twilio = require('./routes/twilio')
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
  app.use(express.static(path.join(__dirname, '/../public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/api/session', session.get);
app.post('/api/session', session.post);
app.get('/api/patients', patients.get);
app.get('/api/patients/:id', patients.getOne);
app.post('/api/patients', patients.post);
app.put('/api/patients/:id', patients.put);
app.delete('/api/patients/:id', patients.delete);
app.get('/api/drugs', drugs.get);
app.get('/api/drugs/:id', drugs.getOne);
app.post('/api/drugs', drugs.post);
app.put('/api/drugs/:id', drugs.put);
app.delete('/api/drugs/:id', drugs.delete);
app.get('/api/courses', courses.get);
app.get('/api/courses/:id', courses.getOne);
app.post('/api/courses', courses.post);
app.put('/api/courses/:id', courses.put);
app.get('/api/users', users.get);
app.post('/api/users', users.post);
app.put('/api/users/:id', users.put);
app.delete('/api/users/:id', users.delete);

app.post("/twilio", twilio.post);

app.get('/reminder', reminder.index);
app.post('/reminder', reminder.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
  console.log(url);
});