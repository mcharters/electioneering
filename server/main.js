import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import users from './users';
import '../imports/api/addresses.js';
import '../imports/api/people.js';

Meteor.startup(() => {
  // code to run on server at startup
  users.forEach(({ username, password }) => {
    if (!Accounts.findUserByUsername(username)) {
      Accounts.createUser({
        username,
        password,
      });
    }
  });
});
