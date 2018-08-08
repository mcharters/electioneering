import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ChooseAddress from './ChooseAddress';

const App = () => (
  <Router>
    <Route exact path="/" component={ChooseAddress} />
  </Router>
);

export default App;
