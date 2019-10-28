# Github Repo Search

### Setup

1. create a `.env.local` local file in the root directory
2. set the variable `REACT_APP_GITHUB_TOKEN` to equal your authentication token in `.env.local`

### Possible Iterations

* Better utilize the Apollo cache for displaying detail pages with fewer http requests
* Search Pagination
* Include more information in the search results list
* Search autocomplete and/or as-you-type search
* Move search input to a separate component
* Replace "Loading..." messages with a progress bar or spinner
* Include more information in the Detail component
* Refactor the Detail component into 2-3 separate components (Header, Content, Actions? might be overkill) to clean things up
* Better evaluate conditional rendering logic
* Add tests where appropriate

### Packages Used

* `apollo-boost`
* `@apollo/react-hooks`
* `graphql`
* `graphql-tag`
* `idx.macro`
* `react-router-dom`
* `@material-ui/core` et al.

### Comments

The Github GraphQL API leaves a lot of room for experimentation, but I stuck to the assignment as I understood it.  I think with the features of the API and given infinite time to iterate I would eventually build Github.

It would be pretty straightforward roadmap to improve the search UI, followed by search results pagination, a more verbose detail page, and finally some polish all around.