import React, { useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import makeStyles from "@material-ui/styles/makeStyles";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import idx from "idx.macro";
import { SEARCH } from "../Queries";
import ResultsList from "./ResultsList";
import SearchInput from "./SearchInput";

const useStyles = makeStyles(theme => ({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: `${theme.spacing(8)}px auto`,
    overflow: "hidden",
    padding: 0
  },
  progress: {
    width: "100%"
  }
}));

const Search = () => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [search, { called, data, loading }] = useLazyQuery(SEARCH, {
    skip: !searchQuery,
    variables: {
      query: searchQuery,
      first: 10
    }
  });

  const edges = idx(data, _ => _.search.edges) || [];

  return (
    <Container
      className={classes.container}
      component={Paper}
      elevation={4}
      maxWidth="sm"
    >
      <SearchInput
        loading={loading}
        onChange={e => setSearchQuery(e.target.value)}
        onSearch={() => {
          search({ variables: { query: searchQuery } });
        }}
        square={called}
        value={searchQuery}
      />
      {loading ? (
        <LinearProgress className={classes.progress} color="secondary" />
      ) : null}
      <ResultsList edges={edges} show={!loading && called} />
    </Container>
  );
};

export default Search;
