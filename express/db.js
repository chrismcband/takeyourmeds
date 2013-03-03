var mongoose = require('mongoose');
mongoose.connect('localhost', 'test');
//mongoose.connect('mongodb://nodejitsu_chrismcband:ri881jq2kk4bst47ck2mlno84@ds051977.mongolab.com:51977/nodejitsu_chrismcband_nodejitsudb4487647365');

var DrugSchema = mongoose.Schema({
    name: String,
    description: String,
    dosageInMG: Number,
    type: String
});

var UserSchema = mongoose.Schema({
    email: String,
    password: String,
    patientid: String
});

var CourseSchema = mongoose.Schema({
    drug: {type: mongoose.Schema.Types.ObjectId, ref: 'Drug'},
    quantity: Number,
    dosageTimes: [Number],
    startDate: Number,
    endDate: Number
});

var PatientSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    dob: Number,
    gender: String,
    photo: String,
    phone1: String,
    phone2: String,
    contactName: String,
    contactPhone: String,
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
});

var Drug = mongoose.model('Drug', DrugSchema);
var Patient = mongoose.model('Patient', PatientSchema);
var User = mongoose.model('User', UserSchema);
var Course = mongoose.model('Course', CourseSchema);

exports.Drug = Drug;
exports.Patient = Patient;
exports.User = User;
exports.Course = Course;