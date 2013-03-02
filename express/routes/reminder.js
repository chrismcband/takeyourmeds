
/*
 * GET reminder xml
 */

exports.index = function(req, res){
    res.setHeader('Content-Type', 'application/xml');

//    var firstname = req.params('firstname');
//    var numpills = req.params('numpills');

    var body = '<?xml version="1.0" encoding="UTF-8"?>';
    body += '<Response><Say voice="woman">Hello Jeff, It is time to take your medication.</Say></Response>';
    res.setHeader('Content-Length', body.length);
    res.end(body);
};