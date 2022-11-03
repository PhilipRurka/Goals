import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import withApollo from 'next-with-apollo';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const SPACE = publicRuntimeConfig.CONTENTFUL_SPACE_ID;
const ENVIRONMENT = publicRuntimeConfig.CONTENTFUL_ENVIRONMENT;
const TOKEN = publicRuntimeConfig.CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENVIRONMENT}`;

const httpLink = createHttpLink({
  fetch,
  uri: CONTENTFUL_URL,
  headers: {
    authorization: `Bearer ${TOKEN}`,
    // 'Content-Language': 'en-us',
  },
});

const client = (initialState: any) => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default withApollo(({ initialState }) => {
  console.log('----------------------')
  console.log(initialState)
  // console.log(client(initialState).store.getCache())
  console.log('----------------------')
  return client(initialState)
});