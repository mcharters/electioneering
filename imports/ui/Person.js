import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Addresses from '../api/addresses';
import People from '../api/people';

const Person = ({ person, loading }) => {
  if (loading) {
    return null;
  }

  if (person === null) {
    return 'New person';
  }

  return 'Edit person';
};

export default withTracker(({ match }) => {
  const addressHandle = Meteor.subscribe('addresses.withId', match.params.addressId);
  const address = Addresses.findOne(new Mongo.ObjectID(match.params.id));

  let person = null;
  if (match.params.personId !== 'new') {
    person = {};
  }

  return {
    person,
    address,
    loading: !addressHandle.ready(),
  };
})(Person);
