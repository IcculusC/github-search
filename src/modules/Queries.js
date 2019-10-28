import gql from "graphql-tag";

export const REPOSITORY = gql`
  query Repository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      description
      languages(first: 10) {
        edges {
          node {
            ... on Language {
              id
              color
              name
            }
          }
        }
      }
      name
      nameWithOwner
      owner {
        login
      }
      stargazers {
        totalCount
      }
      url
    }
  }
`;

export const SEARCH = gql`
  query Search($first: Int!, $query: String!) {
    search(first: $first, query: $query, type: REPOSITORY) {
      edges {
        node {
          ... on Repository {
            id
            name
            nameWithOwner
            owner {
              login
            }
          }
        }
      }
    }
  }
`;

export const PERSISTED_SEARCH_QUERY = gql`
  query {
    searchQuery @client
  }
`;
