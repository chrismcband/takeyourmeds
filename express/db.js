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
    phone2: 'string'
});

var Drug = mongoose.model('Drug', drugSchema);
var Patient = mongoose.model('Patient', patientSchema);

exports.Drug = Drug;
exports.Patient = Patient;