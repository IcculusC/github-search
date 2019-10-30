import gql from "graphql-tag";

export interface ISearchVariables {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
  query: string;
}

export interface ILanguagesNode {
  id: string;
  color: string;
  name: string;
}

export interface ILanguagesEdge {
  node: ILanguagesNode;
}

export interface IRepositoryNode {
  id: string;
  description: string;
  forkCount: number;
  isFork: boolean;
  issues: { totalCount: number };
  languages: { edges: [{ node: ILanguagesNode }] };
  name: string;
  nameWithOwner: string;
  owner: { login: string };
  pullRequests: { totalCount: number };
  stargazers: { totalCount: number };
  url: string;
}

export interface IRepositoryEdge {
  node: IRepositoryNode;
}

export interface IPaginationInfo {
  endCursor?: string;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  startCursor?: string;
}

export interface ISearchResults {
  repositoryCount: number;
  pageInfo: IPaginationInfo;
  edges: IRepositoryEdge[];
}

export interface ISearchResultsReponse {
  search: ISearchResults;
}

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
