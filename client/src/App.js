import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client"; // importr apollo clinet
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";

//  establish the connection to the back-end server's /graphql endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// middleware function to retrieve the token for us and combine it with the existing httpLink
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// ApolloClient() constructor to instantiate the Apollo Client instance and create the connection to the API endpoint.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(), // instantiate a new cache object using new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" element={<SearchBooks />} />
          <Route exact path="/saved" element={<SavedBooks />} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
