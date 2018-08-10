import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import Addresses from '../api/addresses.js';

// App component - represents the whole app
const AddressList = ({ loading, addresses }) => {
  if (loading) {
    return (
      <h1>
        {'Loading...'}
      </h1>
    );
  }

  return (
    <ListGroup>
      {addresses.map(address => (
        <ListGroupItem
          key={address._id}
          tag={Link}
          to={`/addresses/${address._id._str}`}
          className="list-group-item-action"
        >
          {address.address}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

AddressList.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withTracker(({ position }) => {
  const handle = Meteor.subscribe('addresses.nearby', position.coords.longitude, position.coords.latitude);
  let loading = true;
  let nearby = [];

  if (handle.ready()) {
    loading = false;
    nearby = Addresses.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [position.coords.longitude, position.coords.latitude],
          },
          $maxDistance: 500,
        },
      },
    },
    {
      limit: 10,
    }).fetch();
  }

  return {
    loading,
    addresses: nearby,
  };
})(AddressList);
