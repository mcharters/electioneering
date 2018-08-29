import React, { Component } from 'react';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component {
  // Use Meteor Blaze to render login buttons
  componentDidMount() {
    this.view = Blaze.render(
      Template.atForm,
      this.container,
    );
  }

  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }

  render() {
    // Just render a placeholder container that will be filled in
    return <span ref={(container) => { this.container = container; }} />;
  }
}
