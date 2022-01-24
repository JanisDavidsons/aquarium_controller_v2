import React, { Component } from 'react';

import { restController, RestFormLoader, SectionContent } from '../components';
import { NTP_STATUS_ENDPOINT } from '../api';

import NTPStatusForm from './NTPStatusForm';


class NTPStatusController extends Component{

  componentDidMount() {
    this.props.loadData();
  }

  render() {
    return (
      <SectionContent title="NTP Status">
        <RestFormLoader
          {...this.props}
          render={formProps => <NTPStatusForm {...formProps} />}
        />
      </SectionContent>
    );
  }

}

export default restController(NTP_STATUS_ENDPOINT, NTPStatusController);
