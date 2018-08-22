import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { AutoForm } from 'uniforms-bootstrap4';
import Addresses from '../api/addresses';
import People from '../api/people';

class Person extends React.PureComponent {
  handleSubmit = (person) => {
    console.log(person);
  }

  render() {
    const { person, loading, address } = this.props;

    if (loading) {
      return null;
    }

    return (
      <div>
        <h1>
          {`Add new person at ${address.address}`}
        </h1>
        <AutoForm
          schema={People.schema}
          model={person}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default withTracker(({ match }) => {
  const addressHandle = Meteor.subscribe('addresses.withId', match.params.addressId);
  const address = Addresses.findOne(new Mongo.ObjectID(match.params.addressId));

  let person = null;
  let personReady = true;
  if (match.params.personId !== 'new') {
    const personHandle = Meteor.subscribe('people.withId', match.params.personId);
    person = People.findOne(new Mongo.ObjectID(match.params.personId));
    personReady = personHandle.ready();
  }

  return {
    person,
    address,
    loading: !addressHandle.ready() || !personReady,
  };
})(Person);
