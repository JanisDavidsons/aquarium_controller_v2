import React, { Component } from 'react';

import {restController, RestFormLoader, SectionContent } from '../components';
import WiFiStatusForm from './WiFiStatusForm';
import { WIFI_STATUS_ENDPOINT } from '../api';

class WiFiStatusController extends Component {

  componentDidMount() {
    this.props.loadData();
  }

  render() {
    return (
      <SectionContent title="WiFi Status">
        <RestFormLoader
          {...this.props}
          render={formProps => <WiFiStatusForm {...formProps} />}
        />
      </SectionContent>
    );
  }

}

export default restController(WIFI_STATUS_ENDPOINT, WiFiStatusController);
