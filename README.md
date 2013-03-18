Take Your Meds
=============

Reminds people to take their medication.

# Installation

## Prerequisites
1. Working node installation
2. Working mongodb installation (follow relevant guide from http://docs.mongodb.org/manual/installation/)
3. Nodejitsu account (or other node + mongodb hosting solution, must have an accessible internet url in order for twilio to work. Sign up for nodejitsu at https://www.nodejitsu.com/)

## Set up
Assuming you have installed node and mongodb correctly and can execute the `node` command and have a mongodb daemon running (try running the command line `mongo` client, if that doesn't work, try starting the daemon `mongod`)

1. Make sure the mongodb daemon is running (try using the command line `mongo` client, if that fails start the daemon using `mongod` or `sudo service mongodb start` on ubunu.
2. In project directory run `node express/install.js`, this interactive script tells you it will install some base dummy data to get your started. Press enter when asked.
3. If step 2 went ok, you should see some output in the terminal about the objects that were inserted in the database. You may need to copy the _id field of the patient, in the client router index (public/js/router.js index function), there is some code to fetch a patient by id. Paste the id of the patient that was inserted into the database here so the index function will work.

# Running the server

1. Run `node express/app.js`, this starts the express server and listens by default on localhost:8080.
2. Go to `http://localhost:8080` on a browser and you should see the login page.
3. Log in with the default user credentials `root@example.com` with pass `takeyourmeds`