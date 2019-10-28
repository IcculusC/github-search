import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: "center",
    boxSizing: "border-box",
    display: "flex",
    maxWidth: 600,
    padding: "2px 4px",
    width: "100%"
  },
  iconButton: {
    padding: theme.spacing(1.5)
  },
  input: {
    flex: 1,
    paddingLeft: theme.spacing(1)
  }
}));

const SearchInput = props => {
  const classes = useStyles();
  const { onChange, onSearch, value } = props;
  return (
    <Paper className={classes.root} elevation={4}>
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
      <IconButton className={classes.iconButton} onClick={() => onSearch()}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default SearchInput;
