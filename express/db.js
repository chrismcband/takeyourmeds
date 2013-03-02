var mongoose = require('mongoose');
mongoose.connect('mongodb://nodejitsu_chrismcband:ri881jq2kk4bst47ck2mlno84@ds051977.mongolab.com:51977/nodejitsu_chrismcband_nodejitsudb4487647365');

var drugSchema = mongoose.Schema({
    name: 'string',
    description: 'string',
    dosageInMG: 'number',
    type: 'string'
});

var patientSchema = mongoose.Schema({
    firstname: 'string',
    lastname: 'string',
    dob: 'number',
    gender: 'string',
    phone1: 'string',
    phone2: 'string',
    courses: 'array'
});

var userSchema = mongoose.Schema({
    email: 'string',
    password: 'string',
    patientid: 'string'
});

var courseSchema = mongoose.Schema({
    drug: mongoose.Schema.Types.Mixed,
    quantity: 'number',
    dosagetimes: 'array',
    startdate: 'number',
    enddate: 'number'
});

var Drug = mongoose.model('Drug', drugSchema);
var Patient = mongoose.model('Patient', patientSchema);
var User = mongoose.model('User', userSchema);
var Course = mongoose.model('Course', courseSchema);

exports.Drug = Drug;
exports.Patient = Patient;
exports.User = User;
exports.Course = Course;