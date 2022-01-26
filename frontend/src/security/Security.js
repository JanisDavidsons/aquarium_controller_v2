import React, { Component } from 'react';
import { Navigate, Routes } from 'react-router-dom';

import { Tabs, Tab } from '@mui/material';

import {  AuthenticatedRoute } from '../authentication';
import { MenuAppBar } from '../components';

import ManageUsersController from './ManageUsersController';
import SecuritySettingsController from './SecuritySettingsController';

class Security extends Component {

  handleTabChange = (event, path) => {
    this.props.history.push(path);
  };

  render() {
    return (
      <MenuAppBar sectionTitle="Security">
        <Tabs value={this.props.match.url} onChange={this.handleTabChange} variant="fullWidth">
          <Tab value="/security/users" label="Manage Users" />
          <Tab value="/security/settings" label="Security Settings" />
        </Tabs>
        <Routes>
          <AuthenticatedRoute exact path="/security/users" component={ManageUsersController} />
          <AuthenticatedRoute exact path="/security/settings" component={SecuritySettingsController} />
          <Navigate to="/security/users" />
        </Routes>
      </MenuAppBar>
    )
  }
}

export default Security;
