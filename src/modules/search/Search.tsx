import React, { useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import idx from "idx.macro";
import { SEARCH } from "../Queries";
import SearchWidget from "./widget";
import { ResultsList } from "./results";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: `${theme.spacing(8)}px auto`,
    overflow: "hidden",
    padding: 0
  }
}));

const Search = () => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [pageInfo, setPageInfo] = useState({});
  const [search, { called, data, loading, fetchMore }] = useLazyQuery(SEARCH, {
    onCompleted: data => {
      if (data.search.pageInfo) {
        setPageInfo(data.search.pageInfo);
      }
    },
    notifyOnNetworkStatusChange: true
  });

  const edges = idx(data, _ => _.search.edges) || [];
  const repositoryCount = idx(data, _ => _.search.repositoryCount) || 0;

  function onFetchMore(variables: any) {
    fetchMore({
      variables,
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setPageInfo(fetchMoreResult.search.pageInfo);
        return fetchMoreResult;
      }
    });
  }

  return (
    <Container
      square
      className={classes.container}
      component={Paper}
      elevation={4}
      maxWidth="sm"
    >
      <SearchWidget
        color="primary"
        SearchInputProps={{
          onChange: e => setSearchQuery(e.target.value),
          onSearch: () => {
            setPageInfo({});
            search({ variables: { query: searchQuery, first: 10 } });
          },
          value: searchQuery
        }}
        SearchPaginationProps={{
          pageInfo,
          repositoryCount,
          onPageDown: () =>
            onFetchMore({
              after: null,
              before: pageInfo.startCursor,
              first: null,
              last: 10,
              query: searchQuery
            }),
          onPageUp: () =>
            onFetchMore({
              after: pageInfo.endCursor,
              before: null,
              first: 10,
              last: null,
              query: searchQuery
            })
        }}
        loading={loading}
        showPagination={!!data}
      />
      <ResultsList edges={edges} show={called && !!data} />
    </Container>
  );
};

export default Search;
