import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const httpLink = new HttpLink({
  uri: "https://api.graph.cool/simple/v1/cjklkweu90jj80107tsvxflpa"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
