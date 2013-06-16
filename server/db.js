var mongoose = require('mongoose');

mongoose.connection.on("error", function(err){
    console.log("Unable to connect to mongodb database 'takeyourmeds'");
    process.exit();
});

mongoose.connect('localhost', 'takeyourmeds');

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
    role: Number
});

var CourseSchema = mongoose.Schema({
    drug: {type: mongoose.Schema.Types.ObjectId, ref: 'Drug'},
    quantity: Number,
    dosageTimes: [Number],
    startDate: Number,
    endDate: Number
});

var PatientSchema = mongoose.Schema({
    owner: mongoose.Schema.Types.ObjectId,
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
exports.dropDatabase = function(callback){
    mongoose.connection.db.dropDatabase(callback);
};