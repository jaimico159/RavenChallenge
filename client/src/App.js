import React, { Component } from 'react';

import Nav from './components/Nav';

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
      <Nav/>
      </ApolloProvider>
    );
  }
}

export default App;
