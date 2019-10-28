import React, { useState } from "react";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ResultsListItem from "./ResultsListItem";
import { RepoNode } from "../common";

const useStyles = makeStyles(theme => ({
  root: {
    boxSizing: "border-box",
    marginTop: theme.spacing(4),
    maxWidth: 600,
    width: "100%"
  },
  emptyState: {
    color: theme.palette.text.hint,
    padding: theme.spacing(4)
  },
  tableRow: {
    cursor: "pointer"
  }
}));

const Results = props => {
  const classes = useStyles(props);
  const { edges, show } = props;
  const [expanded, setExpanded] = useState(-1);

  function onChange(id, expanded) {
    if (!expanded) {
      setExpanded(-1);
    } else {
      setExpanded(id);
    }
  }

  return (
    <Paper className={classes.root} elevation={4}>
      {show && edges && edges.length === 0 ? (
        <Typography className={classes.emptyState} variant="h6">
          Oh no! This is the empty state...
        </Typography>
      ) : null}
      {show && edges && edges.length
        ? edges.map(({ node }) => (
            <ResultsListItem
              expanded={expanded === node.id}
              key={node.id}
              node={node}
              onChange={onChange}
            />
          ))
        : null}
    </Paper>
  );
};

Results.propTypes = {
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: RepoNode
    })
  ).isRequired,
  show: PropTypes.bool
};

Results.defaultProps = {
  show: false
};

export default Results;
