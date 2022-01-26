import React, { Component } from 'react';
import { Navigate, Routes } from 'react-router-dom'

import { Tabs, Tab } from '@mui/material';

import { withAuthenticatedContext, AuthenticatedRoute } from '../authentication';
import { MenuAppBar } from '../components';

import WiFiStatusController from './WiFiStatusController';
import WiFiSettingsController from './WiFiSettingsController';
import WiFiNetworkScanner from './WiFiNetworkScanner';
import { WiFiConnectionContext } from './WiFiConnectionContext';

class WiFiConnection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectNetwork: this.selectNetwork,
      deselectNetwork: this.deselectNetwork
    };
  }

  selectNetwork = (network) => {
    this.setState({ selectedNetwork: network });
    this.props.history.push('/wifi/settings');
  }

  deselectNetwork = () => {
    this.setState({ selectedNetwork: undefined });
  }

  handleTabChange = (event, path) => {
    this.props.history.push(path);
  };

  render() {
    const { authenticatedContext } = this.props;
    return (
      <WiFiConnectionContext.Provider value={this.state}>
        <MenuAppBar sectionTitle="WiFi Connection">
          <Tabs value={this.props.match.url} onChange={this.handleTabChange} variant="fullWidth">
            <Tab value="/wifi/status" label="WiFi Status" />
            <Tab value="/wifi/scan" label="Scan Networks" disabled={!authenticatedContext.me.admin} />
            <Tab value="/wifi/settings" label="WiFi Settings" disabled={!authenticatedContext.me.admin} />
          </Tabs>
          <Routes>
            <AuthenticatedRoute exact path="/wifi/status" component={WiFiStatusController} />
            <AuthenticatedRoute exact path="/wifi/scan" component={WiFiNetworkScanner} />
            <AuthenticatedRoute exact path="/wifi/settings" component={WiFiSettingsController} />
            <Navigate to="/wifi/status" />
          </Routes>
        </MenuAppBar>
      </WiFiConnectionContext.Provider>
    )
  }
}

export default withAuthenticatedContext(WiFiConnection);
