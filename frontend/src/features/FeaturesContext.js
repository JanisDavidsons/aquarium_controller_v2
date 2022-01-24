import React from 'react';

const FeaturesContextDefaultValue = {};
export const FeaturesContext = React.createContext(
  FeaturesContextDefaultValue
);

export function withFeatures(Component) {
  return class extends React.Component {
    render() {
      return (
        <FeaturesContext.Consumer>
          {featuresContext => <Component {...this.props} features={featuresContext.features} />}
        </FeaturesContext.Consumer>
      );
    }
  };
}