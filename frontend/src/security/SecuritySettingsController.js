import React, { Component } from 'react';

import {restController, RestFormLoader, SectionContent } from '../components';
import { SECURITY_SETTINGS_ENDPOINT } from '../api';

import SecuritySettingsForm from './SecuritySettingsForm';

class SecuritySettingsController extends Component {

  componentDidMount() {
    this.props.loadData();
  }

  render() {
    return (
      <SectionContent title="Security Settings" titleGutter>
        <RestFormLoader
          {...this.props}
          render={formProps => <SecuritySettingsForm {...formProps} />}
        />
      </SectionContent>
    );
  }

}

export default restController(SECURITY_SETTINGS_ENDPOINT, SecuritySettingsController);
