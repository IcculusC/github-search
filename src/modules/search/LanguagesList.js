import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/styles/makeStyles";
import LanguageListItem from "./LanguageListItem";
import { LanguageNode } from "../common";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginTop: theme.spacing(2)
  }
}));

const LanguagesList = props => {
  const classes = useStyles(props);
  const { edges } = props;

  return (
    <div className={classes.root}>
      {edges.map(({ node }) => (
        <LanguageListItem key={node.id} node={node} />
      ))}
    </div>
  );
};

LanguagesList.propTypes = {
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: LanguageNode
    })
  ).isRequired
};

export default LanguagesList;
