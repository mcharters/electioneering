import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import ReactTable from 'react-table';
import People from '../api/people';
import Addresses from '../api/addresses';
import 'react-table/react-table.css';

const TelCell = ({ value }) => {
  if (!value) return null;
  return (
    <a href={`tel:${value}`}>
      {value}
    </a>
  );
};

TelCell.propTypes = {
  value: PropTypes.string,
};

TelCell.defaultProps = {
  value: undefined,
};

const NameCell = ({ original, value }) => (
  <a href={`/addresses/${original.addressId._str}/people/${original._id._str}`}>
    {value}
  </a>
);

NameCell.propTypes = {
  original: PropTypes.shape({
    addressId: PropTypes.shape({
      _str: PropTypes.string,
    }),
    _id: PropTypes.shape({
      _str: PropTypes.string,
    }),
  }).isRequired,
  value: PropTypes.string.isRequired,
};

const AddressCell = ({ original, value }) => (
  <a href={`/addresses/${original.addressId._str}`}>
    {value}
  </a>
);

AddressCell.propTypes = {
  original: PropTypes.shape({
    addressId: PropTypes.shape({
      _str: PropTypes.string,
    }),
  }).isRequired,
  value: PropTypes.string.isRequired,
};

const EmailCell = ({ value }) => (
  <a href={`mailto:${value}`}>
    {value}
  </a>
);

EmailCell.propTypes = {
  value: PropTypes.string.isRequired,
};

const PeopleTable = ({ people, loading }) => {
  if (loading) {
    return null;
  }

  return (
    <ReactTable
      data={people}
      resolveData={data => data.map(person => ({
        ...person,
        address: Addresses.findOne(person.addressId),
      }))}
      columns={[
        {
          Header: 'Name',
          accessor: 'name',
          Cell: NameCell,
        },
        {
          Header: 'Address',
          accessor: 'address.address',
          Cell: AddressCell,
        },
        {
          Header: 'Email',
          accessor: 'email',
          Cell: EmailCell,
        },
        {
          Header: 'Home Phone',
          accessor: 'homePhone',
          Cell: TelCell,
        },
        {
          Header: 'Cell Phone',
          accessor: 'cellPhone',
          Cell: TelCell,
        },
        {
          Header: 'Status',
          accessor: 'status',
        },
        {
          Header: 'Lawn Sign',
          accessor: 'lawnSign',
        },
        {
          Header: 'Created',
          accessor: 'created',
          Cell: ({ value }) => (value ? value.toLocaleString() : ''),
        },
      ]}
    />
  );
};

PeopleTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTracker(() => {
  const peopleHandle = Meteor.subscribe('people');
  const people = People.find({}).fetch();

  return {
    people,
    loading: !peopleHandle.ready(),
  };
})(PeopleTable);
