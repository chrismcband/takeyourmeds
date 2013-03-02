var mongoose = require('mongoose');
mongoose.connect('localhost', 'test');

var drugSchema = mongoose.Schema({
    name: 'string',
    description: 'string',
    dosageInMG: 'number'
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