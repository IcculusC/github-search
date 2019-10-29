import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/styles/makeStyles";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import SearchInput from "./SearchInput";
import SearchPagination from "./SearchPagination";

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: "center",
    background: props => {
      switch (props.color) {
        case "primary":
          return theme.palette.primary.main;
        case "secondary":
          return theme.palette.secondary.main;
        default:
          return undefined;
      }
    },
    boxSizing: "border-box",
    display: "flex",
    flexWrap: "wrap",
    maxWidth: 600,
    paddingTop: 4,
    width: "100%"
  },
  progress: {
    boxSizing: "border-box",
    width: "100%"
  },
  collapse: {
    width: "100%"
  },
  divider: {
    background: props => {
      switch (props.color) {
        case "primary":
          return theme.palette.primary.contrastText;
        case "secondary":
          return theme.palette.primary.contrastText;
        default:
          return undefined;
      }
    },
    width: "100%"
  },
  pagination: {
    width: "100%"
  }
}));

const SearchWidget = props => {
  const classes = useStyles(props);
  const {
    color,
    loading,
    showPagination,
    SearchInputProps,
    SearchPaginationProps
  } = props;

  return (
    <Paper square className={classes.root} elevation={0}>
      <SearchInput color={color} {...SearchInputProps} />
      <Collapse className={classes.collapse} in={showPagination}>
        <Divider light className={classes.divider} />
        <SearchPagination color={color} {...SearchPaginationProps} />
      </Collapse>
      <Collapse className={classes.collapse} in={loading}>
        <LinearProgress
          className={classes.progress}
          color={color === "primary" ? "secondary" : "primary"}
        />
      </Collapse>
    </Paper>
  );
};

SearchWidget.propTypes = {
  color: PropTypes.string,
  SearchInputProps: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    value: PropTypes.string
  }).isRequired,
  SearchPaginationProps: PropTypes.shape({
    onPageDown: PropTypes.func.isRequired,
    onPageUp: PropTypes.func.isRequired,
    pageInfo: PropTypes.shape({
      endCursor: PropTypes.string,
      hasNextPage: PropTypes.bool,
      hasPreviousPage: PropTypes.bool,
      startCursor: PropTypes.string
    }).isRequired,
    repositoryCount: PropTypes.number.isRequired
  }).isRequired
};

SearchWidget.defaultProps = {
  color: "default"
};

export default SearchWidget;
