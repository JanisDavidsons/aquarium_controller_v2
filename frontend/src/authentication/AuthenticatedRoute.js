import * as React from 'react';
import { Navigate, Route } from "react-router-dom";
import { withSnackbar } from 'notistack';

import * as Authentication from './Authentication';
import { withAuthenticationContext, AuthenticatedContext } from './AuthenticationContext';

export class AuthenticatedRoute extends React.Component {

  render() {
    const { enqueueSnackbar, authenticationContext, component: Component, ...rest } = this.props;
    const { location } = this.props;
    const renderComponent = (props) => {
      if (authenticationContext.me) {
        return (
          <AuthenticatedContext.Provider value={authenticationContext}>
            <Component {...props} />
          </AuthenticatedContext.Provider>
        );
      }
      Authentication.storeLoginRedirect(location);
      enqueueSnackbar("Please sign in to continue.", { variant: 'info' });
      return (
        <Navigate to='/' />
      );
    }
    return (
      <Route {...rest} render={renderComponent} />
    );
  }

}

export default withSnackbar(withAuthenticationContext(AuthenticatedRoute));
