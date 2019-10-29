import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import client from "./apollo";
import Search from "./modules/search";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "hsla(200, 85%, 40%, 1)"
    },
    secondary: {
      main: "hsla(40, 70%, 55%, 1)"
    },
    text: {
      primary: "hsla(195, 80%, 10%, 1)"
    }
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Search />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
