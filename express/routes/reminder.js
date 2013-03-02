
/*
 * GET reminder xml
 */

exports.index = function(req, res){
    res.setHeader('Content-Type', 'application/xml');

    var body = '<?xml version="1.0" encoding="UTF-8"?>';
    body += '<Response><Say voice="woman">It is time to take your pills.</Say></Response>';
    res.setHeader('Content-Length', body.length);
    res.end(body);
};