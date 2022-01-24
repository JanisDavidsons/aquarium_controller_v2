import * as React from "react";

const AuthenticationContextDefaultValue = {};
export const AuthenticationContext = React.createContext(
  AuthenticationContextDefaultValue
);

export function withAuthenticationContext(Component) {
  return class extends React.Component{
    render() {
      return (
        <AuthenticationContext.Consumer>
          {authenticationContext => <Component {...this.props} authenticationContext={authenticationContext} />}
        </AuthenticationContext.Consumer>
      );
    }
  };
}

const AuthenticatedContextDefaultValue = {};
export const AuthenticatedContext = React.createContext(
  AuthenticatedContextDefaultValue
);

export function withAuthenticatedContext(Component) {
  return class extends React.Component{
    render() {
      return (
        <AuthenticatedContext.Consumer>
          {authenticatedContext => <Component {...this.props} authenticatedContext={authenticatedContext} />}
        </AuthenticatedContext.Consumer>
      );
    }
  };
}
