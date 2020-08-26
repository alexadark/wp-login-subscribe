import config from "../../config"

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client"
import fetch from "isomorphic-fetch"
import React from "react"

import ls from "local-storage"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${config.wordPressUrl}graphql`,
    headers: {
      authorization: ls("authToken"),
    },
  }),
  fetch,
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
