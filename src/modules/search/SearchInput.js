import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: "center",
    background: theme.palette.primary.main,
    boxSizing: "border-box",
    display: "flex",
    maxWidth: 600,
    padding: "2px 4px",
    width: "100%"
  },
  iconButton: {
    color: theme.palette.primary.contrastText,
    marginRight: theme.spacing(1),
    position: "relative"
  },
  progress: {
    position: "absolute"
  },
  input: {
    color: theme.palette.primary.contrastText,
    flex: 1,
    paddingLeft: theme.spacing(1),
    "& input[type=text]::placeholder": {
      opacity: 0.75
    }
  }
}));

const SearchInput = props => {
  const classes = useStyles();
  const { loading, onChange, onSearch, square, value } = props;
  return (
    <Paper square={square} className={classes.root} elevation={0}>
      <InputBase
        autoFocus
        className={classes.input}
        onChange={onChange}
        onKeyDown={e => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
        placeholder='Search Github repositories and press Enter... try "apollo-client"'
        type="text"
        value={value}
      />
      <IconButton
        centerRipple
        className={classes.iconButton}
        onClick={() => onSearch()}
      >
        <SearchIcon />
        {loading ? (
          <CircularProgress className={classes.progress} color="secondary" />
        ) : null}
      </IconButton>
    </Paper>
  );
};

SearchInput.propTypes = {
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  square: PropTypes.bool,
  value: PropTypes.string.isRequired
};

SearchInput.defaultProps = {
  loading: false,
  square: false
};

export default SearchInput;
