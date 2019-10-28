import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { PERSISTED_SEARCH_QUERY } from "./modules/Queries";

export const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  uri: "https://api.github.com/graphql",
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    });
  }
});

cache.writeQuery({
  query: PERSISTED_SEARCH_QUERY,
  data: {
    searchQuery: ""
  }
});

export default client;
