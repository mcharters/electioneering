import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Addresses from '../api/addresses.js';

class Address extends React.PureComponent {
  handleNobodyHomeClick = (e) => {
    e.preventDefault();
    const { history, address } = this.props;

    Addresses.update(address._id, {
      $set: { people: [] },
    }, {}, () => {
      history.push('/');
    });
  }

  render() {
    const { loading, address, match } = this.props;

    if (loading) {
      return (
        <h1>
          {'Loading...'}
        </h1>
      );
    }

    return (
      <div>
        <h1>
          {address.address}
        </h1>
        {address.people === undefined ? (
          <Button
            block
            onClick={this.handleNobodyHomeClick}
          >
            {'Nobody Home'}
          </Button>
        ) : (
          <p>
            {'Address has been visited.'}
          </p>
        )}
        <Button
          block
          tag={Link}
          to={`${match.url}/people/new`}
        >
          {'Add Person'}
        </Button>
      </div>
    );
  }
}

Address.propTypes = {
  address: PropTypes.shape({
    address: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

Address.defaultProps = {
  address: undefined,
};

export default withTracker(({ match }) => {
  const handle = Meteor.subscribe('addresses.withId', match.params.id);
  const address = Addresses.findOne(new Mongo.ObjectID(match.params.id));
  const loading = !handle.ready();

  return { loading, address };
})(Address);
