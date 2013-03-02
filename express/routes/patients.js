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