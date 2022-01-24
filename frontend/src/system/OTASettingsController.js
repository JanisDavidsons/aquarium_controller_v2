import React, { Component } from 'react';

import {restController, RestFormLoader, SectionContent } from '../components';
import { OTA_SETTINGS_ENDPOINT } from '../api';

import OTASettingsForm from './OTASettingsForm';

class OTASettingsController extends Component {

  componentDidMount() {
    this.props.loadData();
  }

  render() {
    return (
      <SectionContent title="OTA Settings" titleGutter>
        <RestFormLoader
          {...this.props}
          render={formProps => <OTASettingsForm {...formProps} />}
        />
      </SectionContent>
    );
  }

}

export default restController(OTA_SETTINGS_ENDPOINT, OTASettingsController);
