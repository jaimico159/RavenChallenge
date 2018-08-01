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
const token = 'TOKEN';
const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${token}`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <h1>GitHub Users</h1>
    );
  }
}

export default App;
