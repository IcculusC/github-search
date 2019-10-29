import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";

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
    display: "flex",
    flex: 1,
    flexBasis: "100%",
    justifyContent: "space-between",
    padding: "4px 0"
  },
  iconButton: {
    color: props => {
      switch (props.color) {
        case "primary":
          return theme.palette.primary.contrastText;
        case "secondary":
          return theme.palette.primary.contrastText;
        default:
          return undefined;
      }
    },
    "&:first-of-type": {
      marginLeft: 8
    },
    "&:last-of-type": {
      marginRight: 8
    }
  },
  pageInfo: {
    color: props => {
      switch (props.color) {
        case "primary":
          return theme.palette.primary.contrastText;
        case "secondary":
          return theme.palette.primary.contrastText;
        default:
          return undefined;
      }
    }
  }
}));

const SearchPagination = props => {
  const classes = useStyles(props);
  const { onPageDown, onPageUp, pageInfo, repositoryCount } = props;

  function onChange(direction) {
    if (!direction) return;
    if (direction === "down") {
      onPageDown();
    } else {
      onPageUp();
    }
  }

  return (
    <div className={classes.root} variant="dense">
      <IconButton
        className={classes.iconButton}
        disabled={!pageInfo.hasPreviousPage}
        onClick={() => onChange("down")}
      >
        <ChevronLeft />
      </IconButton>
      <Typography className={classes.pageInfo} variant="button">
        {repositoryCount} total results
      </Typography>
      <IconButton
        className={classes.iconButton}
        disabled={!pageInfo.hasNextPage}
        onClick={() => onChange("up")}
      >
        <ChevronRight />
      </IconButton>
    </div>
  );
};

SearchPagination.propTypes = {
  color: PropTypes.string,
  onPageDown: PropTypes.func.isRequired,
  onPageUp: PropTypes.func.isRequired,
  pageInfo: PropTypes.shape({
    endCursor: PropTypes.string,
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool,
    startCursor: PropTypes.string
  }).isRequired,
  repositoryCount: PropTypes.number.isRequired
};

SearchPagination.defaultProps = {
  color: "default"
};

export default SearchPagination;
