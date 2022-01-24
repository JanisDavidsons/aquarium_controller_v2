import React, { Component } from 'react';

import {restController, RestFormLoader, SectionContent } from '../components';
import { SYSTEM_STATUS_ENDPOINT } from '../api';

import SystemStatusForm from './SystemStatusForm';

class SystemStatusController extends Component {

  componentDidMount() {
    this.props.loadData();
  }

  render() {
    return (
      <SectionContent title="System Status">
        <RestFormLoader
          {...this.props}
          render={formProps => <SystemStatusForm {...formProps} />}
        />
      </SectionContent>
    );
  }

}

export default restController(SYSTEM_STATUS_ENDPOINT, SystemStatusController);
