import React, { Component } from 'react';
import { Navigate, Routes } from 'react-router-dom'

import { Tabs, Tab } from '@material-ui/core';

import { withAuthenticatedContext, AuthenticatedRoute } from '../authentication';
import { MenuAppBar } from '../components';

import APSettingsController from './APSettingsController';
import APStatusController from './APStatusController';

class AccessPoint extends Component {

  handleTabChange = (event, path) => {
    this.props.history.push(path);
  };

  render() {
    const { authenticatedContext } = this.props;
    return (
      <MenuAppBar sectionTitle="Access Point">
        <Tabs value={this.props.match.url} onChange={this.handleTabChange} variant="fullWidth">
          <Tab value="/ap/status" label="Access Point Status" />
          <Tab value="/ap/settings" label="Access Point Settings" disabled={!authenticatedContext.me.admin} />
        </Tabs>
        <Routes>
          <AuthenticatedRoute exact path="/ap/status" component={APStatusController} />
          <AuthenticatedRoute exact path="/ap/settings" component={APSettingsController} />
          <Navigate to="/ap/status" />
        </Routes>
      </MenuAppBar>
    )
  }
}

export default withAuthenticatedContext(AccessPoint);
