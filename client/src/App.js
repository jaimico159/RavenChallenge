import React, { Component } from 'react';

/*
import User from './components/User';
import Repo from './components/Repo';
*/

import { InMemoryCache } from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {createHttpLink} from 'apollo-link-http';

/*Authentification*/
//Token must be replaced
const token = 'TOKEN';

//Allows cURL ops
const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${token}`,
  },
});

//Apollo Cient
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});



class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <h1>GitHub Users</h1>
      </ApolloProvider>
    );
  }
}

export default App;
