import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { AutoForm } from 'uniforms-bootstrap4';
import Addresses from '../api/addresses';
import People from '../api/people';

class Person extends React.PureComponent {
  handleSubmit = (person) => {
    const { address, history } = this.props;

    if (!person._id) {
      People.insert({ ...person, addressId: address._id }, (err) => {
        if (!err) {
          history.goBack();
        }
      });
    } else {
      People.update(person._id, {
        $set: person,
      }, {}, (err) => {
        if (!err) {
          history.goBack();
        }
      });
    }
  }

  render() {
    const { person, loading, address } = this.props;

    if (loading) {
      return null;
    }

    return (
      <div>
        <h1>
          {`${person ? 'Edit' : 'Add new'} person at ${address.address}`}
        </h1>
        <AutoForm
          schema={People.schema}
          onSubmit={this.handleSubmit}
          model={person}
        />
      </div>
    );
  }
}

export default withTracker(({ match }) => {
  const addressHandle = Meteor.subscribe('addresses.withId', match.params.addressId);
  const address = Addresses.findOne(new Mongo.ObjectID(match.params.addressId));

  let person;
  let personReady = true;
  if (match.params.personId !== 'new') {
    const personHandle = Meteor.subscribe('person.withId', match.params.personId);
    person = People.findOne(new Mongo.ObjectID(match.params.personId));
    personReady = personHandle.ready();
  }

  return {
    person,
    address,
    loading: !addressHandle.ready() || !personReady,
  };
})(Person);
