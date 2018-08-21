import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { AutoForm } from 'uniforms-bootstrap4';
import Addresses from '../api/addresses';
import People from '../api/people';

const Person = ({ person, loading, address }) => {
  if (loading) {
    return null;
  }

  return (
    <div>
      <h1>
        {`Add new person at ${address.address}`}
      </h1>
      <AutoForm schema={People.schema} />
    </div>
  );
};

export default withTracker(({ match }) => {
  const addressHandle = Meteor.subscribe('addresses.withId', match.params.addressId);
  const address = Addresses.findOne(new Mongo.ObjectID(match.params.addressId));

  let person = null;
  if (match.params.personId === 'new') {
    person = {};
  }

  return {
    person,
    address,
    loading: !addressHandle.ready(),
  };
})(Person);
