import gql from "graphql-tag";

export const SEARCH = gql`
  query Search(
    $first: Int
    $last: Int
    $query: String!
    $after: String
    $before: String
  ) {
    search(
      first: $first
      last: $last
      query: $query
      type: REPOSITORY
      after: $after
      before: $before
    ) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
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
