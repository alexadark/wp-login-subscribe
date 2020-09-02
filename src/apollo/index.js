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
import { TokenRefreshLink } from "apollo-link-token-refresh"
import { handleError, isTokenAlive } from "../utils"

const authToken = ls("authToken")
const refreshToken = ls("refreshToken")
const user = ls("user")
const isValidToken = isTokenAlive(user?.jwtAuthExpiration)

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

// const refreshLink = new TokenRefreshLink({
//   isTokenValidOrUndefined: () =>
//     isValidToken || typeof authToken !== "string",
//   fetchAccessToken: () => {
//     return fetch(getEndpoint("getAccessTokenPath"), {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${getAccessToken()}`,
//         "refresh-token": getRefreshToken(),
//       },
//     })
//   },
//   handleFetch: accessToken => {
//     const accessTokenDecrypted = jwtDecode(accessToken)
//     setAccessToken(accessToken)
//     setExpiresIn(parseExp(accessTokenDecrypted.exp).toString())
//   },
//   handleResponse: (operation, accessTokenField) => response => {
//     // here you can parse response, handle errors, prepare returned token to
//     // further operations
//     // returned object should be like this:
//     // {
//     //    access_token: 'token string here'
//     // }
//   },
//   handleError: err => {
//     // full control over handling token fetch Error
//     console.warn("Your refresh token is invalid. Try to relogin")
//     console.error(err)

//     // your custom action here
//     user.logout()
//   },
// })

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
  fetch,
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
