import React, { Component } from 'react';

import {restController, RestFormLoader, SectionContent } from '../components';
import { MQTT_SETTINGS_ENDPOINT } from '../api';

import MqttSettingsForm from './MqttSettingsForm';

class MqttSettingsController extends Component {

  componentDidMount() {
    this.props.loadData();
  }

  render() {
    return (
      <SectionContent title="MQTT Settings" titleGutter>
        <RestFormLoader
          {...this.props}
          render={formProps => <MqttSettingsForm {...formProps} />}
        />
      </SectionContent>
    )
  }

}

export default restController(MQTT_SETTINGS_ENDPOINT, MqttSettingsController);
