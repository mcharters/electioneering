import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChooseAddress from './ChooseAddress';
import Address from './Address';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ChooseAddress} />
      <Route path="/addresses/:id" component={Address} />
    </Switch>
  </Router>
);

export default App;
