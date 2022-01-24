import React, { Component } from 'react';

import {restController, RestFormLoader, SectionContent } from '../components';
import { NTP_SETTINGS_ENDPOINT } from '../api';

import NTPSettingsForm from './NTPSettingsForm';

class NTPSettingsController extends Component {

  componentDidMount() {
    this.props.loadData();
  }

  render() {
    return (
      <SectionContent title="NTP Settings" titleGutter>
        <RestFormLoader
          {...this.props}
          render={formProps => <NTPSettingsForm {...formProps} />}
        />
      </SectionContent>
    )
  }

}

export default restController(NTP_SETTINGS_ENDPOINT, NTPSettingsController);
