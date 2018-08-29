import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { TextField, LongTextField } from 'uniforms-bootstrap4';

const People = new Mongo.Collection('people', { idGeneration: 'MONGO' });
People.schema = new SimpleSchema({
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
  notes: {
    type: String,
    optional: true,
    uniforms: LongTextField,
  },
});

if (Meteor.isServer) {
  Meteor.publish('person.withId', id => People.find({ _id: new Mongo.ObjectID(id) }));

  Meteor.publish('people.withAddressId', id => People.find({ addressId: new Mongo.ObjectID(id)}));
}

export default People;
