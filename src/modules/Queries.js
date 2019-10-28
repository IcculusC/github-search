import gql from "graphql-tag";

export const REPOSITORY = gql`
  query Repository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      description
      homepageUrl
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
`;

export const PERSISTED_SEARCH_QUERY = gql`
  query {
    searchQuery @client
  }
`;
