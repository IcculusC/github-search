export interface ILanguageNode {
  id: string,
  color: string,
  name: string
}

export interface IRepositoryNode {
  id: string,
  description: string,
  forkCount: number,
  isFork: boolean,
  issues: { totalCount: number },
  languages: { edges: [ { node: ILanguageNode } ] },
  name: string,
  nameWithOwner: string,
  owner: { login: string },
  pullRequests: { totalCount: number },
  stargazers: { totalCount: number },
  url: string
}

export interface IPaginationInfo {
  endCursor?: string,
  hasNextPage?: boolean,
  hasPreviousPage?: boolean,
  startCursor?: string
}