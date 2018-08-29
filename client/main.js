import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AccountsTemplates } from 'meteor/useraccounts:core';
import App from '../imports/ui/App.js';
import login from './config.js';

AccountsTemplates.configure(login);

Meteor.startup(() => {
  render(<App />, document.getElementById('page-content'));
});
