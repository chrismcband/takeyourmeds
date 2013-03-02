var db = require('./../db');


exports.get = function(req, res){
    db.Patient.find(function (err, patients) {
        if (err) {
          console.log("error finding patients "+err);
        }
        res.send(patients);
    });
};

exports.getOne = function(req, res){
    var id = req.params.id;

    db.Patient.findOne({_id: id}, function(err, patient){
        if (err){
            console.log("Unable to find patient "+id);
        }
        res.send(patient);
    });
};

exports.post = function(req, res) {
    var patient = new db.Patient(req.body);

    patient.save(function(err, p){
        if (err){
            console.log("Unable to save patient");
        }
        res.send(p);
    });
};

exports.put = function(req, res) {
    var id = req.params.id;

    var changes = {};
    if (req.body.firstname) {
        changes.firstname = req.body.firstname;
    }
    if (req.body.lastname) {
        changes.lastname = req.body.lastname;
    }
    if (req.body.dob) {
        changes.dob = req.body.dob;
    }
    if (req.body.gender) {
        changes.gender = req.body.gender;
    }
    if (req.body.phone1) {
        changes.phone1 = req.body.phone1;
    }
    if (req.body.phone2) {
        changes.phone2 = req.body.phone2;
    }

    db.Patient.findOneAndUpdate({_id: id}, changes, function(err, patient){
        if (err){
            console.log("Unable to update drug");
        }
        res.send(patient);
    });
};