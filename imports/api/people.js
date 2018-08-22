import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

const People = new Mongo.Collection('people', { idGeneration: 'MONGO' });
People.schema = new SimpleSchema({
  name: String,
  email: SimpleSchema.RegEx.EmailWithTLD,
  phone: SimpleSchema.RegEx.Phone,
  status: { type: SimpleSchema.Integer, allowedValues: [1, 2, 3, 4] },
  reiminder: Boolean,
  newsletter: Boolean,
  lawnSign: Boolean,
  canvas: Boolean,
  donate: Boolean,
  notes: String,
});

if (Meteor.isServer) {
  Meteor.publish('person.withId', id => People.find({ _id: new Mongo.ObjectID(id) }));
}

export default People;
