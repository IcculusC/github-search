import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { useDebounce, Card, CardHeader } from "./common";

const Result = styled(Link)`
  align-items: center;
  color: unset;
  display: flex;
  font-weight: 600;
  min-height: 48px;
  padding: 16px;
  text-decoration: none;

  &:hover {
    background: hsla(195, 40%, 90%, 1);
    color: hsla(195, 60%, 30%, 1);
    cursor: pointer;
  }

  & > img {
    box-shadow: inset 0px 2px 4px hsla(0, 0%, 0%, 0.2),
      0px 1px 2px hsla(0, 0%, 50%, 0.35), 0px 1px 5px hsla(0, 0%, 50%, 0.7);
    height: auto;
    margin-right: 16px;
    width: 32px;
  }
`;

const ResultsContainer = styled(Card)`
  margin-top: 16px;
  max-width: 600px;
`;

const ResultsList = ({ edges }) => (
  <ResultsContainer>
    <CardHeader>Matching Repositories</CardHeader>
    {edges.map(({ node }) => (
      <Result key={node.id} to={`/repo/${node.owner.login}/${node.name}`}>
        <img src={node.openGraphImageUrl} alt={node.name} />
        {node.nameWithOwner}
      </Result>
    ))}
  </ResultsContainer>
);

const SearchLabel = styled.div`
  font-size: 24px;
  font-weight: 500;
  padding: 16px;
`;

const SearchInput = styled.input`
  border-radius: 6px;
  border: none;
  box-shadow: inset 0px 1px 2px hsla(0, 0%, 0%, 0.6),
    0px 1px 2px hsla(0, 0%, 60%, 0.3);
  box-sizing: border-box;
  font-size: 18px;
  font-weight: 700;
  max-width: 600px;
  outline: none;
  padding: 10px;
  width: 100%;
`;

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("material-ui");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { data, loading, error } = useQuery(
    gql`
      query Search($first: Int!, $query: String!) {
        search(first: $first, query: $query, type: REPOSITORY) {
          edges {
            node {
              ... on Repository {
                id
                name
                nameWithOwner
                openGraphImageUrl
                owner {
                  login
                }
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          repositoryCount
        }
      }
    `,
    {
      skip: !searchQuery,
      variables: {
        query: debouncedSearchQuery,
        first: 10
      }
    }
  );

  return (
    <>
      <SearchLabel>Search Github Repositories</SearchLabel>
      <SearchInput
        autoFocus
        type="text"
        style={{ width: "50%", margin: "auto" }}
        onChange={e => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
      {error ? <h1>Error...</h1> : null}
      {loading ? <h1>Loading...</h1> : null}
      {!loading && data ? <ResultsList edges={data.search.edges} /> : null}
    </>
  );
};

export default Search;
