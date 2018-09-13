import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error'

import App from './App'

import './style.css';

// configure HttpLink, will be fed to Apollo Client
const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    // authorization: `Bearer ${
    //   process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    // }`,
    authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
  },
});

// configure ErrorLink, will be combined with HttpLink and then will be fed to Apollo Client
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(error => {
      console.log(error.message)
    })
  }

  if (networkError) {
    console.log(networkError.message)
  }
});

// configure cache: normalize data, cache request to avoid unnecessary request
const cache = new InMemoryCache();

// create the Apollo client
const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache,
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

