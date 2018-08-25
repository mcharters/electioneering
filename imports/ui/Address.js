import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import Addresses from '../api/addresses.js';
import People from '../api/people.js';

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
    const { loading, address, match, people } = this.props;

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
        {people.length > 0 && (
          <div>
            <h2>
              {'People'}
            </h2>
            <ListGroup>
              {people.map(person => (
                <ListGroupItem
                  key={person._id}
                  tag={Link}
                  to={`/addresses/${address._id._str}/people/${person._id._str}`}
                  className="list-group-item-action"
                >
                  {person.name}
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        )}
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
  const addressHandle = Meteor.subscribe('addresses.withId', match.params.id);
  const address = Addresses.findOne(new Mongo.ObjectID(match.params.id));
  const peopleHandle = Meteor.subscribe('people.withAddressId', match.params.id);
  const people = People.find({ addressId: new Mongo.ObjectID(match.params.id) }).fetch();
  const loading = !addressHandle.ready() || !peopleHandle.ready();

  return { loading, address, people };
})(Address);
