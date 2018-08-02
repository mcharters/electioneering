import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Addresses from '../api/addresses.js';

// App component - represents the whole app
class App extends Component {

  render() {
    return (
      <div>
        <ul>
          {this.props.addresses.map((address, idx) => (
            <li key={idx}>
              {address.address}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}


export default withTracker(() => {
  return {
    addresses: Addresses.find({}, { limit: 10 }).fetch(),
  };
})(App);
