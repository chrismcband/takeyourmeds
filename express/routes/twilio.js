


exports.post = function(req, res) {
    var sys = require('sys');
    var Twilio = require('twilio');
    var client = Twilio('AC24359087a5190689c411f214c94bacab', '5eb27d99e50a024f60480685faa4d7b5');

    var firstname = req.body.firstname;
    var numPills = req.body.numpills;



    client.makeCall({
            to:'+447723072947', // Any number Twilio can call
            from: '+441290211634', // A number you bought from Twilio and can use for outbound communication
            url: 'http://chrismcband.lwshackday.nodejitsu.com/reminder'
            //url: 'https://dl.dropbox.com/u/32556860/reminder.xml' // A URL that produces an XML document (TwiML) which contains instructions for the call
    }, function(err, responseData) {

        console.log("Error: "+err);

        //executed when the call has been initiated.
        console.log(responseData.from); // outputs "+14506667788"
        res.setHeader('Location', '/');
        res.end();
    });
};