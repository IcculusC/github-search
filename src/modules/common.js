import PropTypes from "prop-types";

export const LanguageNode = PropTypes.shape({
  color: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string
});

export const RepoNode = PropTypes.shape({
  id: PropTypes.string,
  description: PropTypes.string,
  forkCount: PropTypes.number,
  isFork: PropTypes.bool,
  issues: PropTypes.shape({
    totalCount: PropTypes.number
  }),
  languages: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: LanguageNode
      })
    )
  }),
  name: PropTypes.string,
  nameWithOwner: PropTypes.string,
  owner: PropTypes.shape({
    login: PropTypes.string
  }),
  pullRequests: PropTypes.shape({
    totalCount: PropTypes.number
  }),
  stargazer: PropTypes.shape({
    totalCount: PropTypes.number
  }),
  url: PropTypes.string
});
