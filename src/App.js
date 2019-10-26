import React from "react";
import styled, { createGlobalStyle } from "styled-components/macro";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import client from "./apollo";
import routes from "./routes";

const history = createBrowserHistory();

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 64px auto;
  width: 100%;
`;

const GlobalCSS = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

function App() {
  return (
    <ApolloProvider client={client}>
      <Container>
        <GlobalCSS />
        <Router history={history}>
          <Switch>
            {routes.map((route, index) => (
              <Route key={index} {...route} />
            ))}
          </Switch>
        </Router>
      </Container>
    </ApolloProvider>
  );
}

export default App;
