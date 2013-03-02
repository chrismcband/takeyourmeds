
/*
 * GET users listing.
 */

exports.list = function(req, res){
    console.log(req.session.data);
  res.send("respond with a resource");
};