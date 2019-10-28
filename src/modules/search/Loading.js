import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  progress: {
    marginTop: theme.spacing(8)
  }
}));

export default props => {
  const classes = useStyles(props);

  return <CircularProgress className={classes.progress} color="primary" />;
};
