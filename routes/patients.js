var db = require('./../db');
var __ = require('underscore');

exports.get = function(req, res){
    db.Patient.find().populate('courses').exec(function (err, patients) {
        if (err) {
          console.log("error finding patients "+err);
        }

        var populatedPatients = [];

        console.log("patients "+patients);

        __(patients).each(function(patient){
            var patient = patient.toObject();
            console.log("patient: ", patient);
            var count = 0;
            if (patient.courses.length > 0) {
                __(patient.courses).each(function(course){
                    db.Drug.findOne({_id: course.drug}, function(err, drug){
                        patient.courses[count].drug = drug;
                        count++;
                        if (count == patient.courses.length) {
                            populatedPatients.push(patient);
                            if (populatedPatients.length == patients.length) {
                                console.log("populated: ", populatedPatients);
                                res.send(populatedPatients);
                            }
                        }
                    });
                });
            } else {
                populatedPatients.push(patient);
                if (populatedPatients.length == patients.length) {
                    console.log("populated: ", populatedPatients);
                    res.send(populatedPatients);
                }
            }

        });
    });
};

exports.getOne = function(req, res){
    var id = req.params.id;

    db.Patient.findOne({_id: id}).populate('courses').exec(function(err, patient){
        if (err){
            console.log("Unable to find patient "+id, err);
        }
        if (patient) {
            var count = 0;
            patient = patient.toObject();

            if (patient.courses.length > 0){
                __(patient.courses).each(function(course){
                    db.Drug.findOne({_id: course.drug}, function(err, drug){
                        patient.courses[count].drug = drug;
                        count++;
                        if (count == patient.courses.length) {
                            res.send(patient);
                        }
                    });
                });
            } else {
                res.send(patient);
            }
        }
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
    if (req.body.photo) {
        changes.photo = req.body.photo;
    }
    if (req.body.phone1) {
        changes.phone1 = req.body.phone1;
    }
    if (req.body.phone2) {
        changes.phone2 = req.body.phone2;
    }
    if (req.body.contactName) {
        changes.contactName = req.body.contactName;
    }
    if (req.body.contactPhone) {
        changes.contactPhone = req.body.contactPhone;
    }
    if (req.body.courses) {
        var courseIds = [];
        for (var i = 0; i < req.body.courses.length; i++) {
            courseIds.push(req.body.courses[i]._id);
        }
        changes.courses = courseIds;
    }

    db.Patient.findOneAndUpdate({_id: id}, changes, function(err, patient){
        if (err){
            console.log("Unable to update patient", err);
        }


        db.Patient.findOne({_id: id}).populate('courses').exec(function(err, patient){
            if (err){
                console.log("Unable to find updated patient", err);
            }

            var count = 0;
            patient = patient.toObject();

            console.log("Patient: "+patient.courses.length);
            if (patient.courses.length > 0) {
                __(patient.courses).each(function(course){
                    db.Drug.findOne({_id: course.drug}, function(err, drug){
                        patient.courses[count].drug = drug;
                        count++;
                        if (count == patient.courses.length) {
                            res.send(patient);
                        }
                    });
                });
            } else {
                res.send(patient);
            }

        });
    });
};

exports.delete = function(req, res) {
    var id = req.params.id;

    db.Patient.remove({_id: id}, function(err){
        if (err){
            console.log("Unable to delete patient");
        }
        //send id as json string
        res.send('"'+id+'"');
    });
}
