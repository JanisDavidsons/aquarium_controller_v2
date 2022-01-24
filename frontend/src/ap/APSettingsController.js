import React, { Component } from 'react';

import { AP_SETTINGS_ENDPOINT } from '../api';
import {restController, RestFormLoader, SectionContent } from '../components';

import APSettingsForm from './APSettingsForm';

class APSettingsController extends Component {

  componentDidMount() {
    this.props.loadData();
  }

  render() {
    return (
      <SectionContent title="Access Point Settings" titleGutter>
        <RestFormLoader
          {...this.props}
          render={formProps => <APSettingsForm {...formProps} />}
        />
      </SectionContent>
    )
  }

}

export default restController(AP_SETTINGS_ENDPOINT, APSettingsController);
