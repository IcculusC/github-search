# Github Repo Search

### Setup

1. create a `.env.local` local file in the root directory
2. set the variable `REACT_APP_GITHUB_TOKEN` to equal your authentication token in `.env.local`

### Possible Iterations

* Search Pagination
* Search autocomplete and/or as-you-type search
* Better evaluate conditional rendering logic
* Improve responsive support
* Add tests where appropriate

### Packages Used

* `apollo-boost`
* `@apollo/react-hooks`
* `graphql`
* `graphql-tag`
* `idx.macro`
* `@material-ui/core` et al.

### Comments

The Github GraphQL API leaves a lot of room for experimentation, and in this branch I decided to explore a bit.

I used expansion panels rather than an external component to improve the UX of the search results.  I heavily utilized composition so that hypothetically one could re-add the details page pretty quickly by utilizing the `RepositoryDetails` component.  I also added some simple responsive elements to the search results and detail display panels as well as more information about the repository (issues, prs, forks).