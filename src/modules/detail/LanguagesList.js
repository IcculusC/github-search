import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/styles/makeStyles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import LanguageListItem from "./LanguageListItem";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    padding: "16px 0",
    marginBottom: 16
  },
  title: {
    width: "100%"
  },
  divider: {
    width: "100%",
    marginBottom: 16,
    marginTop: 8
  }
});

const LanguagesList = props => {
  const classes = useStyles(props);
  const { edges } = props;

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="subtitle2">
        Languages
      </Typography>
      <Divider className={classes.divider} />
      {edges.map(({ node }) => (
        <LanguageListItem key={node.id} color={node.color} name={node.name} />
      ))}
    </div>
  );
};

LanguagesList.propTypes = {
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        color: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string
      })
    })
  ).isRequired
};

export default LanguagesList;
