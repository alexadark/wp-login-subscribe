import config from "../../config"
import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"
import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import ls from "local-storage"

const client = new ApolloClient({
  uri: `${config.wordPressUrl}graphql`,
  headers: {
    authorization: ls("authToken"),
  },
  fetch,
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
