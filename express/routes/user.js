var db = require('./../db');

exports.get = function(req, res){
    db.User.find(function (err, users) {
        if (err) {
          console.log("error finding users"+err);
        }
        res.send(users);
    });
};


exports.put = function(req, res) {
    var id = req.params.id;

    var changes = req.body;

    db.User.findOneAndUpdate({_id: id}, changes, function(err, user){
        if (err){
            console.log("Unable to update drug");
        }
        res.send(user);
    });
};

/*
 * GET users listing.
 */

exports.list = function(req, res){
    console.log(req.session.data);
  res.send("respond with a resource");
};