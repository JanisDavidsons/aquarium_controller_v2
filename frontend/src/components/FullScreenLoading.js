import React from 'react';

import { CircularProgress } from '@mui/material';
import { Typography} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => createStyles({
    fullScreenLoading: {
      padding: theme.spacing(2),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      flexDirection: "column"
    },
    progress: {
      margin: theme.spacing(4),
    }
  }));

  const FullScreenLoading = () => {
    const classes = useStyles();
    return (
      <div className={classes.fullScreenLoading}>
        <CircularProgress className={classes.progress} size={100} />
        <Typography variant="h4">
          Loading&hellip;
        </Typography>
      </div>
    )
  }
  
  export default FullScreenLoading;