import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Mongo } from 'meteor/mongo';
import Addresses from '../api/addresses.js';

const Address = ({ address }) => (
  <h1>
    {address.address}
  </h1>
);

Address.propTypes = {
  address: PropTypes.shape({
    address: PropTypes.string,
  }).isRequired,
};

export default withTracker(({ match }) => ({
  address: Addresses.findOne({ _id: new Mongo.ObjectID(match.params.id) }),
}))(Address);
