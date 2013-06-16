var db = require('./../db');

exports.get = function(req, res){
    db.Course.find().populate('drug').exec(function(err, courses){
        if (err) {
          console.log("error finding courses "+err);
        }
        res.send(courses);
    });
};

exports.getOne = function(req, res){
    var id = req.params.id;

    db.Course.findOne({_id: id}, function(err, course){
        if (err){
            console.log("Unable to find course "+id);
        }
        res.send(course);
    });
};

exports.post = function(req, res) {
    var course = new db.Course(req.body);

    course.save(function(err, c){
        if (err){
            console.log("Unable to save course");
        }
        res.send(c);
    });
};

exports.createOne = function(req, res){
    db.Drug.findOne({_id: "513216536a2b89b62e000002"}, function(err, drug){
        var course = new db.Course({
            "drug": drug._id,
            quantity: 1,
            dosageTimes: [ 36000, 75600 ],
            startDate: 1362322800,
            endDate: 1364652000
        });

        console.log("Creating course: "+course);

        course.save(function(err, c){
            if (err){
                console.log(err);
            }
            res.send(c);
        });
    });
};

exports.put = function(req, res) {
    var id = req.params.id;

    var changes = {};
    if (req.body.drug) {
        changes.drug = req.body.drug;
    }
    if (req.body.quantity) {
        changes.quantity = req.body.quantity;
    }
    if (req.body.dosageTimes) {
        changes.dosageTimes = req.body.dosageTimes;
    }
    if (req.body.startDate) {
        changes.startDate = req.body.startDate;
    }
    if (req.body.endDate) {
        changes.endDate = req.body.endDate;
    }

    db.Course.findOneAndUpdate({_id: id}, changes, function(err, course){
        if (err){
            console.log("Unable to update drug");
        }
        res.send(course);
    });
};