import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useApolloClient, useLazyQuery, useQuery } from "@apollo/react-hooks";
import idx from "idx.macro";
import makeStyles from "@material-ui/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import { PERSISTED_SEARCH_QUERY, SEARCH } from "../Queries";
import Results from "./Results";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    background: "hsla(195, 100%, 98%, 0.75)",
    boxSizing: "border-box",
    display: "flex",
    maxWidth: 600,
    padding: "2px 4px",
    width: "100%"
  },
  iconButton: {
    padding: 10
  },
  input: {
    flex: 1,
    marginLeft: 8
  }
});

const Search = props => {
  const { history } = props;
  const classes = useStyles(props);
  const client = useApolloClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [search, { called, data, loading }] = useLazyQuery(SEARCH, {
    skip: !searchQuery,
    variables: {
      query: searchQuery,
      first: 10
    }
  });
  const { data: persistedQueryData } = useQuery(PERSISTED_SEARCH_QUERY);
  useEffect(() => {
    if (persistedQueryData && persistedQueryData.searchQuery) {
      setSearchQuery(persistedQueryData.searchQuery);
      search({ variables: { query: persistedQueryData.searchQuery } });
    }
  }, [persistedQueryData, search, setSearchQuery]);

  const edges = idx(data, _ => _.search.edges) || [];

  function onSelect(...args) {
    client.writeQuery({
      query: PERSISTED_SEARCH_QUERY,
      data: { searchQuery }
    });
    history.push(...args);
  }

  return (
    <React.Fragment>
      <Paper className={classes.root} elevation={4}>
        <InputBase
          autoFocus
          className={classes.input}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              search({ variables: { query: searchQuery } });
            }
          }}
          placeholder='Search Github repositories and press Enter... try "apollo-client"'
          value={searchQuery}
        />
        <IconButton
          className={classes.iconButton}
          onClick={() => search({ variables: { query: searchQuery } })}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Results edges={edges} onSelect={onSelect} show={!loading && called} />
    </React.Fragment>
  );
};

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default Search;
