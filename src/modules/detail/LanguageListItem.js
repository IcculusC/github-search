import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles({
  language: {
    alignItems: "baseline",
    display: "inline-flex",
    marginRight: 16,
    paddingBottom: 8,
    userSelect: "none",

    "&:before": {
      background: props => props.color,
      borderRadius: 8,
      boxShadow:
        "0px 1px 2px hsla(0, 0%, 50%, 0.35),0px 1px 5px hsla(0, 0%, 50%, 0.7)",
      content: "''",
      display: "inline-flex",
      height: 16,
      marginRight: 8,
      width: 16,
      transform: "translateY(2px)"
    }
  }
});

const Language = props => {
  const { name } = props;
  const classes = useStyles(props);

  return <div className={classes.language}>{name}</div>;
};

Language.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Language;
