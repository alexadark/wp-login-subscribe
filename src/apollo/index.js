import config from "../../config"

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  createHttpLink,
  ApolloLink,
} from "@apollo/client"
import fetch from "isomorphic-fetch"
import React from "react"
import { setContext } from "@apollo/client/link/context"

import ls from "local-storage"

import {
  getTokenRefreshLink,
  FetchNewAccessToken,
} from "apollo-link-refresh-token"
import jwtDecode from "jwt-decode"

const authToken = ls("authToken")
const refreshToken = ls("refreshToken")
const user = ls("user")

const isTokenValid = authToken => {
  const decodedToken = jwtDecode(authToken)
  console.log("decoded", decodedToken)
  if (!decodedToken) {
    return false
  }

  const now = new Date()
  return now.getTime() < decodedToken.exp * 1000
}

const httpLink = createHttpLink({
  uri: `${config.wordPressUrl}graphql`,
})

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : "",
    },
  }
})

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
  fetch,
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
