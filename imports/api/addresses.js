import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Addresses = new Mongo.Collection('addresses', { idGeneration: 'MONGO' });

if (Meteor.isServer) {
  Meteor.publish('addresses.nearby', (longitude, latitude) => Addresses.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        $maxDistance: 500,
      },
    },
  },
  {
    limit: 50,
  }));

  Meteor.publish('addresses.withId', id => Addresses.find({ _id: new Mongo.ObjectID(id) }));

  Meteor.publish('addresses.search', search => Addresses.find({
    $text: { $search: `"${search}"` },
  }));
}

export default Addresses;
