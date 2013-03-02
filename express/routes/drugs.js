var db = require('./../db');


exports.get = function(req, res){
    db.Drug.find(function (err, drugs) {
        if (err) {
          console.log("error finding drugs "+err);
        }
        res.send(drugs);
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