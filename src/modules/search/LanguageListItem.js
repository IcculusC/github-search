import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { LanguageNode } from "../common";

const useStyles = makeStyles(theme => ({
  language: {
    alignItems: "baseline",
    display: "inline-flex",
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    userSelect: "none",

    "&:before": {
      background: props => props.node.color,
      borderRadius: theme.spacing(1),
      boxShadow:
        "0px 1px 2px hsla(0, 0%, 50%, 0.35),0px 1px 5px hsla(0, 0%, 50%, 0.7)",
      content: "''",
      display: "inline-flex",
      height: theme.spacing(2),
      marginRight: theme.spacing(1),
      width: theme.spacing(2),
      transform: "translateY(2px)"
    }
  }
}));

const Language = props => {
  const { node } = props;
  const classes = useStyles(props);

  return <Typography className={classes.language}>{node.name}</Typography>;
};

Language.propTypes = {
  node: LanguageNode.isRequired
};

export default Language;