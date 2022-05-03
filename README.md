# electioneering

A location-aware web app to help political candidates canvas for municipal elections in Waterloo, Ontario.

## Running Locally

1. Install [Meteor](https://www.meteor.com/install).
2. Create a copy of `server/users.js.example` called `server/users.js` and add a local username/password for testing.
3. Run Meteor: `cd electioneering && meteor`
4. Install [python](https://www.python.org/) with [pymongo](https://api.mongodb.com/python/current/).
5. Import addresses: `cd electioneering/setup && python address_import.py --ward <ward>` (Not specifying a ward will import all addresses)

## Running in Production

1. Install [Meteor Up](http://meteor-up.com/) and configure according to their instructions to point at your production server.
   - **Notes**:
     - Electioneering uses location services to determine nearby addresses, which requires SSL to be enabled - Meteor Up can handle this for you, just read the section on [setting up an nginx proxy](http://meteor-up.com/docs.html#reverse-proxy).
     - The address import script assumes your mongo database is named `meteor`, and Meteor Up names gives your database the name of your app, so make sure you name your app `meteor` when configuring, or use your database name when running the address import in production.
2. Provision your server and deploy the app according to Meteor Up's [instructions](http://meteor-up.com/getting-started.html)
3. Import addresses on the server. Meteor Up only bundles the meteor resources it knows about, so for the time being you'll have to copy the python script and CSV file up to your server and run it there with the `--production` flag to use Meteor Up's default mongodb port. You'll need to have python and pymongo installed on your server too.
4. Create some users in the `server/users.js` file as above to make some users.
