import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Addresses from '../api/addresses.js';

const Address = ({ loading, address }) => (
  <h1>
    {loading ? 'Loading...' : address.address}
  </h1>
);

Address.propTypes = {
  address: PropTypes.shape({
    address: PropTypes.string,
  }),
  loading: PropTypes.bool.isRequired,
};

Address.defaultProps = {
  address: undefined,
};

export default withTracker(({ match }) => {
  const handle = Meteor.subscribe('addresses.withId', match.params.id);
  const address = Addresses.findOne(new Mongo.ObjectID(match.params.id));
  const loading = !handle.ready();

  return { loading, address };
})(Address);
