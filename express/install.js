#!/usr/bin/env node

/**
 * Module dependencies.
 */
var util = require('util');
var __ = require('underscore');

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');

var msg = "This install script will restore the mongodb database 'takeyourmeds' to the original base state.\n";
msg += "This base state consists of a single super user with the following credentials:\n\n";
msg += "Email: root@example.com\nPassword: takeyourmeds\n\n";
msg += "It will also include some dummy fixture data for Patients, Drugs and Courses.\n";
msg += "The takeyourmeds mongodb database now be restored to the default state, any existing data will be lost.\n";
msg += "Press enter to continue or any other key to abort...\n";

process.stdout.write(msg);

process.stdin.on('data', function (text) {
    if (text != '\r') {
        abort();
    } else {
        install();
    }

    if (text === 'quit\n') {
      abort();
    }
});

function abort() {
    process.stdout.write('Aborting.\n');
    process.exit();
}

function install() {
    var db = require('./db');

    //remove any existing models in database
    db.dropDatabase(function(){

        var queue = [];

        //create a single super user
        var user = new db.User({
            email: 'root@example.com',
            password: 'takeyourmeds',
            role: 1
        });
        queue.push(user);

        var patient1 = new db.Patient({
            firstname: "Jeff",
            lastname: "Smith",
            dob: 0,
            gender: 'male',
            phone1: '+447723072947',
            phone2: '+447723072947'
        });
        queue.push(patient1);

        var drug1 = new db.Drug({
            name: 'Candesartan',
            description: 'Angiotensin receptor blocker',
            dosageInMG: '500',
            type: 'pill'
        });
        queue.push(drug1);

        var drug2 = new db.Drug({
            name: 'Lansoprazole',
            description: 'Proton-pump inhibitor',
            dosageInMG: '30',
            type: 'pill'
        });
        queue.push(drug2);

        var drug3 = new db.Drug({
            name: 'Metformin',
            description: 'Blood glucose regulator',
            dosageInMG: '500',
            type: 'pill'
        });
        queue.push(drug3);

        var processedCount = 0;

        __(queue).each(function(model){
            model.save(function(err, m){
                if (err){
                    console.log("Unable to save model "+model);
                } else {
                    console.log("Saved: "+m);
                    processedCount += 1;
                    if (processedCount === queue.length) {
                        //finished saving models, exit
                        process.stdout.write("Finished.\n");
                        process.exit();
                    }
                }
            });
        });
    });
}