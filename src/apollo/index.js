import config from "../../config"

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  createHttpLink,
} from "@apollo/client"
import fetch from "isomorphic-fetch"
import React from "react"
import { setContext } from "@apollo/client/link/context"

import ls from "local-storage"

const httpLink = createHttpLink({
  uri: `${config.wordPressUrl}graphql`,
})

const authLink = setContext((_, { headers }) => {
  const token = ls("authToken")
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  fetch,
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
