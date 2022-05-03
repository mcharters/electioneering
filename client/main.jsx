import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from '../imports/ui/App.js';

Meteor.startup(() => {
  render(<App />, document.getElementById('page-content'));
});
