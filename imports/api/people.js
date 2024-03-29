import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import SimpleSchema from 'simpl-schema';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import { TextField, LongTextField } from 'uniforms-bootstrap5';
import Addresses from './addresses';

const People = new Mongo.Collection('people', { idGeneration: 'MONGO' });
People.schema = new SimpleSchema2Bridge(new SimpleSchema({
  name: String,
  email: {
    type: SimpleSchema.RegEx.EmailWithTLD,
    optional: true,
    uniforms: {
      component: TextField,
      type: 'email',
    },
  },
  homePhone: {
    type: SimpleSchema.RegEx.Phone,
    optional: true,
    uniforms: {
      component: TextField,
      type: 'tel',
    },
  },
  cellPhone: {
    type: SimpleSchema.RegEx.Phone,
    optional: true,
    uniforms: {
      component: TextField,
      type: 'tel',
    },
  },
  status: {
    type: SimpleSchema.Integer,
    allowedValues: [1, 2, 3, 4],
    optional: true,
  },
  reminder: {
    type: Boolean,
    optional: true,
  },
  newsletter: {
    type: Boolean,
    optional: true,
  },
  lawnSign: {
    type: String,
    allowedValues: ['Requested', 'Delivered'],
    optional: true,
  },
  canvas: {
    type: Boolean,
    optional: true,
  },
  donate: {
    type: Boolean,
    optional: true,
  },
  voted: {
    type: Boolean,
    optional: true,
  },
  notes: {
    type: String,
    optional: true,
    uniforms: LongTextField,
  },
}));

if (Meteor.isServer) {
  Meteor.publish('person.withId', id => People.find({ _id: new Mongo.ObjectID(id) }));

  Meteor.publish('people.withAddressId', id => People.find({ addressId: new Mongo.ObjectID(id) }));

  publishComposite('people', {
    find() {
      return People.find({});
    },
    children: [{
      find(person) {
        return Addresses.find({ _id: person.addressId });
      },
    }],
  });
}

export default People;
