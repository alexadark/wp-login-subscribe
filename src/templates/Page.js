/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"

const Page = ({ data }) => {
  const {
    title,
    content,
    hiddenContent: { premium, proContent },
  } = data.wpPage
  console.log("data", data)
  return (
    <Layout>
      <h1>{title}</h1>
      <h3>Normal content</h3>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <h3>Premium Content</h3>
      <div dangerouslySetInnerHTML={{ __html: premium }} />
      <h3>Pro Content</h3>
      <div dangerouslySetInnerHTML={{ __html: proContent }} />
    </Layout>
  )
}

export default Page

export const pageQuery = graphql`
  query GET_PAGE($uri: String!) {
    wpPage(uri: { eq: $uri }) {
      content
      title
      hiddenContent {
        premium
        proContent
      }
    }
  }
`
