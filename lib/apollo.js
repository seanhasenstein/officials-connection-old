import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { fetch } from 'isomorphic-unfetch';

const cache = new InMemoryCache();
const link = new createHttpLink({
  uri: 'http://localhost:3000/api/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  cache,
  link,
  fetch,
  ssrMode: false,
});

export default client;
