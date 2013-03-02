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