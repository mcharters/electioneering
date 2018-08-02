import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Addresses from '../api/addresses.js';

// App component - represents the whole app
const App = ({ addresses }) => (
  <ListGroup>
    {addresses.map(address => (
      <ListGroupItem key={address._id}>
        {address.address}
      </ListGroupItem>
    ))}
  </ListGroup>
);

App.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTracker(() => ({
  addresses: Addresses.find({}, { limit: 10 }).fetch(),
}))(App);
