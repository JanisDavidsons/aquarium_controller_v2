import React, { Component } from 'react';
import { Navigate, Routes } from 'react-router-dom'

import { Tabs, Tab } from '@mui/material';

import { withFeatures } from '../features/FeaturesContext';

import { withAuthenticatedContext, AuthenticatedRoute } from '../authentication';
import { MenuAppBar } from '../components';

import SystemStatusController from './SystemStatusController';
import OTASettingsController from './OTASettingsController';
import UploadFirmwareController from './UploadFirmwareController';

class System extends Component {

  handleTabChange = (event, path) => {
    this.props.history.push(path);
  };

  render() {
    const { authenticatedContext, features } = this.props;
    return (
      <MenuAppBar sectionTitle="System">
        <Tabs value={this.props.match.url} onChange={this.handleTabChange} variant="fullWidth">
          <Tab value="/system/status" label="System Status" />
          {features.ota && (
            <Tab value="/system/ota" label="OTA Settings" disabled={!authenticatedContext.me.admin} />
          )}
          {features.upload_firmware && (
            <Tab value="/system/upload" label="Upload Firmware" disabled={!authenticatedContext.me.admin} />
          )}
        </Tabs>
        <Routes>
          <AuthenticatedRoute exact path="/system/status" component={SystemStatusController} />
          {features.ota && (
            <AuthenticatedRoute exact path="/system/ota" component={OTASettingsController} />
          )}
          {features.upload_firmware && (
            <AuthenticatedRoute exact path="/system/upload" component={UploadFirmwareController} />
          )}
          <Navigate to="/system/status" />
        </Routes>
      </MenuAppBar>
    )
  }
}

export default withFeatures(withAuthenticatedContext(System));
