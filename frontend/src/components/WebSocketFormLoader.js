import React from 'react';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { LinearProgress, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    loadingSettings: {
      margin: theme.spacing(0.5),
    },
    loadingSettingsDetails: {
      margin: theme.spacing(4),
      textAlign: "center"
    }
  })
);

export default function WebSocketFormLoader(props) {
  const { connected, render, data, ...rest } = props;
  const classes = useStyles();
  if (!connected || !data) {
    return (
      <div className={classes.loadingSettings}>
        <LinearProgress className={classes.loadingSettingsDetails} />
        <Typography variant="h6" className={classes.loadingSettingsDetails}>
          Connecting to WebSocket...
        </Typography>
      </div>
    );
  }
  return render({ ...rest, data });
}
