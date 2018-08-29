import React from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChooseAddress from './ChooseAddress';
import Address from './Address';
import Person from './Person';
import Login from './Login';

const App = () => {
  if (Meteor.userId()) {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ChooseAddress} />
          <Route path="/addresses/:addressId/people/:personId" component={Person} />
          <Route path="/addresses/:id" component={Address} />
        </Switch>
      </Router>
    );
  }

  return <Login />;
};

export default App;
