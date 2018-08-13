import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

const AddressList = ({ loading, addresses, title }) => {
  if (loading) {
    return null;
  }

  return (
    <div>
      <Label>
        {title}
      </Label>
      <ListGroup>
        {addresses.map(address => (
          <ListGroupItem
            key={address._id}
            tag={Link}
            to={`/addresses/${address._id._str}`}
            className="list-group-item-action"
          >
            {address.address}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

AddressList.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default AddressList;
