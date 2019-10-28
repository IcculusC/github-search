import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import client from "./apollo";
import routes from "./routes";
import Container from "./modules/Container";

const history = createBrowserHistory();

function App() {
  return (
    <ApolloProvider client={client}>
      <Container>
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
