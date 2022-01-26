import React, { Component } from 'react';
import { Navigate, Routes } from 'react-router-dom'

import { Tabs, Tab } from '@mui/material';

import { withAuthenticatedContext, AuthenticatedRoute } from '../authentication';
import { MenuAppBar } from '../components';

import NTPStatusController from './NTPStatusController';
import NTPSettingsController from './NTPSettingsController';

class NetworkTime extends Component {

  handleTabChange = (event, path) => {
    this.props.history.push(path);
  };

  render() {
    const { authenticatedContext } = this.props;
    return (
      <MenuAppBar sectionTitle="Network Time">
        <Tabs value={this.props.match.url} onChange={this.handleTabChange} variant="fullWidth">
          <Tab value="/ntp/status" label="NTP Status" />
          <Tab value="/ntp/settings" label="NTP Settings" disabled={!authenticatedContext.me.admin} />
        </Tabs>
        <Routes>
          <AuthenticatedRoute exact path="/ntp/status" component={NTPStatusController} />
          <AuthenticatedRoute exact path="/ntp/settings" component={NTPSettingsController} />
          <Navigate to="/ntp/status" />
        </Routes>
      </MenuAppBar>
    )
  }

}

export default withAuthenticatedContext(NetworkTime)
