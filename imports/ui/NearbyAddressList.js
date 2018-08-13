import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import AddressList from './AddressList.js';

import Addresses from '../api/addresses.js';

const NearbyAddressList = withTracker(({ position }) => {
  const handle = Meteor.subscribe('addresses.nearby', position.coords.longitude, position.coords.latitude);
  let loading = true;
  let nearby = [];

  if (handle.ready()) {
    loading = false;
    nearby = Addresses.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [position.coords.longitude, position.coords.latitude],
          },
          $maxDistance: 500,
        },
      },
    },
    {
      limit: 10,
    }).fetch();
  }

  return {
    loading,
    addresses: nearby,
  };
})(AddressList);

export default NearbyAddressList;
