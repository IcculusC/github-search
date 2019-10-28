import React, { useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import makeStyles from "@material-ui/styles/makeStyles";
import Container from "@material-ui/core/Container";
import idx from "idx.macro";
import { SEARCH } from "../Queries";
import ResultsList from "./ResultsList";
import SearchInput from "./SearchInput";
import Loading from "./Loading";

const useStyles = makeStyles(theme => ({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: `${theme.spacing(8)}px auto`
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
    <Container className={classes.container} maxWidth="md">
      <SearchInput
        onChange={e => setSearchQuery(e.target.value)}
        onSearch={() => {
          search({ variables: { query: searchQuery } });
        }}
        value={searchQuery}
      />
      {loading ? <Loading /> : null}
      <ResultsList edges={edges} show={!loading && called} />
    </Container>
  );
};

export default Search;
