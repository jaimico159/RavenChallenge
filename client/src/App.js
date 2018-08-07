import React, { Component } from 'react';

import Nav from './components/Nav';

import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {createHttpLink} from 'apollo-link-http';
import introspectionQueryResultData from './components/querySchema.json';

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

//Introspection Fragment Matcher
const fragmentMatcher = new IntrospectionFragmentMatcher({introspectionQueryResultData});

const cache = new InMemoryCache({fragmentMatcher});

//Apollo Cient
const client = new ApolloClient({
  cache,
  link: httpLink,
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
