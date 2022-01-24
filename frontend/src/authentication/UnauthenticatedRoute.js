import * as React from 'react';
import { Navigate, Route } from "react-router-dom";

import { withAuthenticationContext } from './AuthenticationContext';
import * as Authentication from './Authentication';
import { withFeatures } from '../features/FeaturesContext';

class UnauthenticatedRoute extends Route {

  render() {
    const { authenticationContext, component: Component, features, ...rest } = this.props;
    const renderComponent = (props) => {
      if (authenticationContext.me) {
        return (<Navigate to={Authentication.fetchLoginRedirect(features)} />);
      }
      return (<Component {...props} />);
    }
    return (
      <Route {...rest} render={renderComponent} />
    );
  }
}

export default withFeatures(withAuthenticationContext(UnauthenticatedRoute));
