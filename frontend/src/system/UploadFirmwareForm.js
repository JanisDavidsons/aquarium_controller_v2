import React, { Fragment } from 'react';
import { SingleUpload } from '../components';
import { Box } from '@mui/material';

class UploadFirmwareForm extends React.Component {

  handleDrop = (files) => {
    const file = files[0];
    if (file) {
      this.props.onFileSelected(files[0]);
    }
  };

  render() {
    const { uploading, progress, onCancel } = this.props;
    return (
      <Fragment>
        <Box py={2}>
          Upload a new firmware (.bin) file below to replace the existing firmware.
        </Box>
        <SingleUpload accept="application/octet-stream" onDrop={this.handleDrop} uploading={uploading} progress={progress} onCancel={onCancel} />
      </Fragment>
    );
  }

}

export default UploadFirmwareForm;
