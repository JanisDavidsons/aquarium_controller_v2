import { Avatar, makeStyles } from "@mui/material";
import React from "react";

const useStyles = makeStyles({
  root: (props) => ({
    backgroundColor: props.color
  })
});

const HighlightAvatar = (props) => {
  const classes = useStyles(props);
  return (
    <Avatar className={classes.root}>
      {props.children}
    </Avatar>
  );
}

export default HighlightAvatar;