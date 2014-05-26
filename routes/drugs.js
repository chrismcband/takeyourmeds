var db = require('./../db');


exports.get = function(req, res){
    db.Drug.find(function (err, drugs) {
        if (err) {
          console.log("error finding drugs "+err);
        }
        res.send(drugs);
    });
};

exports.getOne = function(req, res){
    var id = req.params.id;

    db.Drug.findOne({_id: id}, function(err, drug){
        if (err){
            console.log("Unable to find patient "+id);
        }
        res.send(drug);
    });
};

exports.post = function(req, res) {
    var drug = new db.Drug(req.body);

    drug.save(function(err, d){
        if (err){
            console.log("Unable to save drug");
        }
        res.send(d);
    });
};

exports.put = function(req, res) {
    var id = req.params.id;

    var changes = {};
    if (req.body.name) {
        changes.name = req.body.name;
    }
    if (req.body.description) {
        changes.description = req.body.description;
    }
    if (req.body.dosageInMG) {
        changes.dosageInMG = req.body.dosageInMG;
    }
    if (req.body.type) {
        changes.type = req.body.type;
    }

    db.Drug.findOneAndUpdate({_id: id}, changes, function(err, drug){
        if (err){
            console.log("Unable to update drug");
        }
        res.send(drug);
    });
};

exports.delete = function(req, res) {
    var id = req.params.id;

    db.Drug.remove({_id: id}, function(err){
        if (err){
            console.log("Unable to delete drug");
        }
        //send id as json string
        res.send('"'+id+'"');
    });
}