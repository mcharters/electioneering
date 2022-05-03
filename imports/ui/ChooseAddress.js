import React, { PureComponent } from 'react';
import {
  Form, FormGroup, Input,
} from 'reactstrap';
import queryString from 'query-string';
import NearbyAddressList from './NearbyAddressList.js';
import SearchAddressList from './SearchAddressList.js';

class ChooseAddress extends PureComponent {
  constructor(props) {
    super(props);

    const params = queryString.parse(props.location.search);

    this.state = {
      position: null,
      search: params.search || '',
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => { this.setState({ position }); },
    );
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  }

  render() {
    const { position, search } = this.state;

    return (
      <div>
        <Form>
          <FormGroup>
            <Input
              type="text"
              name="search"
              id="searchField"
              placeholder="Search for an address..."
              value={search}
              onChange={this.handleSearchChange}
            />
          </FormGroup>
        </Form>
        {search.length === 0 && position !== null
          && <NearbyAddressList position={position} title="Addresses Nearby" />
        }
        {search.length > 0
          && <SearchAddressList search={search} title="Search Results" />
        }
      </div>
    );
  }
}

export default ChooseAddress;
