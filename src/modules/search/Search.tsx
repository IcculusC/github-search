import React, { useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import idx from "idx.macro";
import {
  SEARCH,
  IPaginationInfo,
  IRepositoryEdge,
  ISearchResultsReponse,
  ISearchVariables
} from "../Queries";
import SearchWidget from "./widget";
import { ResultsList } from "./results";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: `${theme.spacing(8)}px auto`,
    maxWidth: 600,
    overflow: "hidden",
    padding: 0
  }
}));

const Search = () => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageInfo, setPageInfo] = useState<IPaginationInfo>({});
  const [search, { called, data, loading, fetchMore }] = useLazyQuery<
    ISearchResultsReponse,
    ISearchVariables
  >(SEARCH, {
    onCompleted: (data: ISearchResultsReponse) => {
      if (data.search.pageInfo) {
        setPageInfo(data.search.pageInfo);
      }
    },
    notifyOnNetworkStatusChange: true
  });

  const edges: IRepositoryEdge[] = (idx(data, _ => _.search.edges) ||
    []) as IRepositoryEdge[];
  const repositoryCount: number = idx(data, _ => _.search.repositoryCount) || 0;

  function onFetchMore(variables: any) {
    fetchMore({
      variables,
      updateQuery: (
        prev: ISearchResultsReponse,
        { fetchMoreResult }: { fetchMoreResult?: ISearchResultsReponse }
      ) => {
        if (!fetchMoreResult) return prev;
        setPageInfo(fetchMoreResult.search.pageInfo);
        return fetchMoreResult;
      }
    });
  }

  return (
    <Paper square className={classes.container} elevation={4}>
      <SearchWidget
        color="primary"
        SearchInputProps={{
          onChange: e => setSearchQuery((e.target as HTMLInputElement).value),
          onSearch: () => {
            setPageInfo({});
            search({ variables: { query: searchQuery, first: 10 } });
          },
          value: searchQuery
        }}
        SearchPaginationProps={{
          loading,
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
    </Paper>
  );
};

export default Search;
