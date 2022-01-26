import React, { Fragment } from 'react';
import { useDropzone } from 'react-dropzone';

import { makeStyles, createStyles } from '@mui/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Typography, LinearProgress, Button } from '@mui/material';

const progressPercentage = (progress) => Math.round((progress.loaded * 100) / progress.total);

const getBorderColor = (theme, props) => {
  if (props.isDragAccept) {
    return theme.palette.success.main;
  }
  if (props.isDragReject) {
    return theme.palette.error.main;
  }
  if (props.isDragActive) {
    return theme.palette.info.main;
  }
  return theme.palette.grey[700];
}

const useStyles = makeStyles((theme) => createStyles({
  dropzone: {
    padding: theme.spacing(8, 2),
    borderWidth: 2,
    borderRadius: 2,
    borderStyle: 'dashed',
    color: theme.palette.grey[700],
    transition: 'border .24s ease-in-out',
    cursor: (props) => props.uploading ? 'default' : 'pointer',
    width: '100%',
    borderColor: (props) => getBorderColor(theme, props)
  }
}));

const SingleUpload = ({ onDrop, onCancel, accept, uploading, progress }) => {
  const dropzoneState = useDropzone({ onDrop, accept, disabled: uploading, multiple: false });
  const { getRootProps, getInputProps } = dropzoneState;
  const classes = useStyles({ ...dropzoneState, uploading });


  const renderProgressText = () => {
    if (uploading) {
      if (progress?.lengthComputable) {
        return `Uploading: ${progressPercentage(progress)}%`;
      }
      return "Uploading\u2026";
    }
    return "Drop file or click here";
  }

  const renderProgress = (progress) => (
    <LinearProgress
      variant={!progress || progress.lengthComputable ? "determinate" : "indeterminate"}
      value={!progress ? 0 : progress.lengthComputable ? progressPercentage(progress) : 0}
    />
  );

  return (
    <div {...getRootProps({ className: classes.dropzone })}>
      <input {...getInputProps()} />
      <Box flexDirection="column" display="flex" alignItems="center">
        <CloudUploadIcon fontSize='large' />
        <Typography variant="h6">
          {renderProgressText()}
        </Typography>
        {uploading && (
          <Fragment>
            <Box width="100%" p={2}>
              {renderProgress(progress)}
            </Box>
            <Button startIcon={<CancelIcon />} variant="contained" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </Fragment>
        )}
      </Box>
    </div>
  );
}

export default SingleUpload;
