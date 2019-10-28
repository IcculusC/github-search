import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    background: "hsla(195, 100%, 98%, 0.75)",
    boxSizing: "border-box",
    marginTop: 32,
    maxWidth: 600,
    width: "100%"
  },
  emptyState: {
    color: "hsla(0, 0%, 60%, 1)"
  },
  tableRow: {
    cursor: "pointer"
  }
});

const Results = props => {
  const classes = useStyles(props);
  const { edges, onSelect, show } = props;
  return (
    <Paper className={classes.root} elevation={4}>
      <Table>
        {show && edges && edges.length === 0 ? (
          <TableBody>
            <TableRow tabIndex={-1}>
              <TableCell align="center">
                <Typography className={classes.emptyState} variant="h6">
                  Oh no! This is the empty state...
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : null}
        {show && edges && edges.length ? (
          <React.Fragment>
            <TableHead>
              <TableRow>
                <TableCell>Repository</TableCell>
                <TableCell>Owner</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {edges.map(({ node }) => (
                <TableRow
                  hover
                  className={classes.tableRow}
                  key={node.id}
                  onClick={() => onSelect(`/repo/${node.nameWithOwner}`)}
                  tabIndex={-1}
                >
                  <TableCell align="left">{node.name}</TableCell>
                  <TableCell align="left">{node.owner.login}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </React.Fragment>
        ) : null}
      </Table>
    </Paper>
  );
};

Results.propTypes = {
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        nameWithOwner: PropTypes.string,
        owner: PropTypes.shape({
          login: PropTypes.string
        })
      })
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  show: PropTypes.bool
};

Results.defaultProps = {
  show: false
};

export default Results;
