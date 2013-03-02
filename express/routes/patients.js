var db = require('./../db');


exports.get = function(req, res){
    db.Patient.find(function (err, patients) {
        if (err) {
          console.log("error finding patients "+err);
        }
        res.send(patients);
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