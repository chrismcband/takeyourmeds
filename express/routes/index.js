
/*
 * GET home page.
 */

exports.index = function(req, res){
    req.session.data = {"test": "test session data"};
    res.render('index', { title: 'Express' });
};