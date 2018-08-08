import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ChooseAddress from './ChooseAddress';
import Address from './Address';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={ChooseAddress} />
      <Route path="/addresses/:id" component={Address} />
    </div>
  </Router>
);

export default App;
