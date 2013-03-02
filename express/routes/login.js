exports.index = function(req, res){
    res.render('login', {});


    console.log(req.session.data);
};

exports.post = function(req, res){

    console.log("Username: "+req.username);

};