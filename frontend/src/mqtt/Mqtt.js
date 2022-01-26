import React, { Component } from 'react';
import { Navigate, Routes } from 'react-router-dom'

import { Tabs, Tab } from '@mui/material';

import { withAuthenticatedContext, AuthenticatedRoute } from '../authentication';
import { MenuAppBar } from '../components';
import MqttStatusController from './MqttStatusController';
import MqttSettingsController from './MqttSettingsController';

class Mqtt extends Component {

  handleTabChange = (event, path) => {
    this.props.history.push(path);
  };

  render() {
    const { authenticatedContext } = this.props;
    return (
      <MenuAppBar sectionTitle="MQTT">
        <Tabs value={this.props.match.url} onChange={this.handleTabChange} variant="fullWidth">
          <Tab value="/mqtt/status" label="MQTT Status" />
          <Tab value="/mqtt/settings" label="MQTT Settings" disabled={!authenticatedContext.me.admin} />
        </Tabs>
        <Routes>
          <AuthenticatedRoute exact path="/mqtt/status" component={MqttStatusController} />
          <AuthenticatedRoute exact path="/mqtt/settings" component={MqttSettingsController} />
          <Navigate to="/mqtt/status" />
        </Routes>
      </MenuAppBar>
    )
  }
}

export default withAuthenticatedContext(Mqtt);
