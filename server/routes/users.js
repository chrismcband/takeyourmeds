var db = require('./../db');

exports.get = function(req, res){
    db.User.find(function (err, users) {
        if (err) {
          console.log("error finding users"+err);
        }
        res.send(users);
    });
};

exports.post = function(req, res){
    var user = new db.User(req.body);

    user.save(function(err, u){
        if (err){
            console.log("Unable to save user");
        }
        res.send(u);
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

exports.delete = function(req, res) {
    var id = req.params.id;

    db.User.remove({_id: id}, function(err){
        if (err){
            console.log("Unable to delete user");
        }
        //send id as json string
        res.send('"'+id+'"');
    });
}

/*
 * GET users listing.
 */

exports.list = function(req, res){
    console.log(req.session.data);
  res.send("respond with a resource");
};