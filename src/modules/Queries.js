import gql from "graphql-tag";

export const SEARCH = gql`
  query Search($first: Int!, $query: String!) {
    search(first: $first, query: $query, type: REPOSITORY) {
      edges {
        node {
          ... on Repository {
            id
            description
            forkCount
            isFork
            issues(filterBy: { states: [OPEN] }) {
              totalCount
            }
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
            pullRequests(states: [OPEN]) {
              totalCount
            }
            releases {
              totalCount
            }
            stargazers {
              totalCount
            }
            url
            watchers {
              totalCount
            }
          }
        }
      }
    }
  }
`;
