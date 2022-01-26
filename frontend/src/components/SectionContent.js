import React from 'react';

import { Typography, Paper } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      padding: theme.spacing(2),
      margin: theme.spacing(3),
    }
  })
);

const SectionContent = (props) => {
  const { children, title, titleGutter } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.content}>
      <Typography variant="h6" gutterBottom={titleGutter}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};

export default SectionContent;
