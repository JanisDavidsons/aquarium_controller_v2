import React, { Component } from 'react';

import { restController, RestFormLoader, SectionContent } from '../components';
import WiFiSettingsForm from './WiFiSettingsForm';
import { WIFI_SETTINGS_ENDPOINT } from '../api';

class WiFiSettingsController extends Component {

  componentDidMount() {
    this.props.loadData();
  }

  render() {
    return (
      <SectionContent title="WiFi Settings">
        <RestFormLoader
          {...this.props}
          render={formProps => <WiFiSettingsForm {...formProps} />}
        />
      </SectionContent>
    );
  }

}

export default restController(WIFI_SETTINGS_ENDPOINT, WiFiSettingsController);
