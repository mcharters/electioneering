import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import AddressList from './AddressList.js';

import Addresses from '../api/addresses.js';

export default withTracker(({ search }) => {
  if (search.length >= 3) {
    const handle = Meteor.subscribe('addresses.search', search);
    return {
      loading: !handle.ready(),
      addresses: Addresses.find({}, { limit: 10 }).fetch(),
    };
  }

  return {
    loading: false,
    addresses: [],
  };
})(AddressList);
