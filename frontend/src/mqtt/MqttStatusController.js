import React, { Component } from 'react';

import {restController, RestFormLoader, SectionContent } from '../components';
import { MQTT_STATUS_ENDPOINT } from '../api';

import MqttStatusForm from './MqttStatusForm';

class MqttStatusController extends Component {

  componentDidMount() {
    this.props.loadData();
  }

  render() {
    return (
      <SectionContent title="MQTT Status">
        <RestFormLoader
          {...this.props}
          render={formProps => <MqttStatusForm {...formProps} />}
        />
      </SectionContent>
    )
  }
}

export default restController(MQTT_STATUS_ENDPOINT, MqttStatusController);
