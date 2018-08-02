import React, { PureComponent } from 'react';
import AddressList from './AddressList.js';

// App component - represents the whole app
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      position: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => { this.setState({ position }); },
    );
  }

  render() {
    const { position } = this.state;

    if (position === null) {
      return (
        <h1>
          {'Finding location'}
        </h1>);
    }

    return <AddressList position={position} />;
  }
}

export default App;
