import React, { Component } from 'react';
import { Navigate, Routes } from 'react-router-dom'

import { Tabs, Tab } from '@material-ui/core';

import { PROJECT_PATH } from '../api';
import { MenuAppBar } from '../components';
import { AuthenticatedRoute } from '../authentication';

import DemoInformation from './DemoInformation';
import LightStateRestController from './LightStateRestController';
import LightStateWebSocketController from './LightStateWebSocketController';
import LightMqttSettingsController from './LightMqttSettingsController';

class DemoProject extends Component {

  handleTabChange = (event, path) => {
    this.props.history.push(path);
  };

  render() {
    return (
      <MenuAppBar sectionTitle="Demo Project">
        <Tabs value={this.props.match.url} onChange={this.handleTabChange} variant="fullWidth">
          <Tab value={`/${PROJECT_PATH}/demo/information`} label="Information" />
          <Tab value={`/${PROJECT_PATH}/demo/rest`} label="REST Controller" />
          <Tab value={`/${PROJECT_PATH}/demo/socket`} label="WebSocket Controller" />
          <Tab value={`/${PROJECT_PATH}/demo/mqtt`} label="MQTT Controller" />
        </Tabs>
        <Routes>
          <AuthenticatedRoute exact path={`/${PROJECT_PATH}/demo/information`} component={DemoInformation} />
          <AuthenticatedRoute exact path={`/${PROJECT_PATH}/demo/rest`} component={LightStateRestController} />
          <AuthenticatedRoute exact path={`/${PROJECT_PATH}/demo/socket`} component={LightStateWebSocketController} />
          <AuthenticatedRoute exact path={`/${PROJECT_PATH}/demo/mqtt`} component={LightMqttSettingsController} />
          <Navigate to={`/${PROJECT_PATH}/demo/information`} />
        </Routes>
      </MenuAppBar>
    )
  }

}

export default DemoProject;
