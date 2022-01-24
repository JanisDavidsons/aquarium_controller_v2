import React from 'react';

const ApplicationContextDefaultValue = {};

export const ApplicationContext = React.createContext(
    ApplicationContextDefaultValue
  );

  export function withAuthenticatedContexApplicationContext(Component) {
    return class extends React.Component {
      render() {
        return (
          <ApplicationContext.Consumer>
            {authenticatedContext => <Component {...this.props} features={authenticatedContext} />}
          </ApplicationContext.Consumer>
        );
      }
    };
  }