/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Bio = ({ author }) => (
  <section>
    <Image
      fixed={""}
      alt={author}
      imgStyle={{
        borderRadius: `50%`,
      }}
    />
    <p>
      Written by <strong>{author}</strong>
    </p>
  </section>
)

const bioQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={bioQuery}
    render={data => <Bio author={data.site.siteMetadata} {...props} />}
  />
)
