


exports.post = function(req, res) {
    var sys = require('sys');
    var Twilio = require('twilio');
    var client = Twilio('AC24359087a5190689c411f214c94bacab', '5eb27d99e50a024f60480685faa4d7b5');

    var firstname = req.body.firstname;
    var numPills = req.body.numpills;

    var Pusher = require('pusher');

    var pusher = new Pusher({
      appId: '38446',
      key: 'bd24f5f6f712de39457e',
      secret: 'e1637067481936a4b747'
    });

    pusher.trigger( 'channel-1', 'test_event', { message: "Hello Jeff, it is time to take your medication." } );

    client.makeCall({
            to:'+447723072947', // Any number Twilio can call
            from: '+441290211634', // A number you bought from Twilio and can use for outbound communication
            url: 'http://chrismcband.lwshackday.nodejitsu.com/reminder'
            //url: 'https://dl.dropbox.com/u/32556860/reminder.xml' // A URL that produces an XML document (TwiML) which contains instructions for the call
    }, function(err, responseData) {

        if (err){
            console.log("Error: "+err);
        }



        //executed when the call has been initiated.
        console.log(responseData.from); // outputs "+14506667788"
        res.setHeader('Location', '/');
        res.end();
    });
};