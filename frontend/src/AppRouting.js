import React, { Component } from 'react';
import { Navigate, Routes } from 'react-router';

import * as Authentication from './authentication/Authentication';
import AuthenticationWrapper from './authentication/AuthenticationWrapper';
import UnauthenticatedRoute from './authentication/UnauthenticatedRoute';
import AuthenticatedRoute from './authentication/AuthenticatedRoute';

import SignIn from './SignIn';
import ProjectRouting from './project/ProjectRouting';
import WiFiConnection from './wifi/WiFiConnection';
import AccessPoint from './ap/AccessPoint';
import NetworkTime from './ntp/NetworkTime';
import Security from './security/Security';
import System from './system/System';

import { PROJECT_PATH } from './api';
import Mqtt from './mqtt/Mqtt';
import { withFeatures } from './features/FeaturesContext';

export const getDefaultRoute = (features) => features.project ? `/${PROJECT_PATH}/` : "/wifi/";

class AppRouting extends Component {

  componentDidMount() {
    Authentication.clearLoginRedirect();
  }

  render() {
    const { features } = this.props;
    return (
      <AuthenticationWrapper>
        <Routes>
          {features.security && (
            <UnauthenticatedRoute exact path="/" component={SignIn} />
          )}
          {features.project && (
            <AuthenticatedRoute exact path={`/${PROJECT_PATH}/*`} component={ProjectRouting} />
          )}
          <AuthenticatedRoute exact path="/wifi/*" component={WiFiConnection} />
          <AuthenticatedRoute exact path="/ap/*" component={AccessPoint} />
          {features.ntp && (
          <AuthenticatedRoute exact path="/ntp/*" component={NetworkTime} />
          )}
          {features.mqtt && (
            <AuthenticatedRoute exact path="/mqtt/*" component={Mqtt} />
          )}
          {features.security && (
            <AuthenticatedRoute exact path="/security/*" component={Security} />
          )}
          <AuthenticatedRoute exact path="/system/*" component={System} />
          <Navigate to={getDefaultRoute(features)} />
        </Routes>
      </AuthenticationWrapper>
    )
  }
}

export default withFeatures(AppRouting);
