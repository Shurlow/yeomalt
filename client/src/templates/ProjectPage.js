import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import BlockContent from "../components/BlockContent"

export default function ProjectPage(props) {
  const {
    title,
    location,
    description,
    image,
    _rawBody,
  } = props.data.sanityProject

  return (
    <Layout location={location} title={title}>
      <SEO title={title} description={title} />
      <header className="page-head">
        <h2 className="page-head-title">{title}</h2>
      </header>
      <article className="post-content">
        {description && <p class="post-content-excerpt">{description}</p>}
        {image && (
          <div className="post-content-image">
            <figure className="kg-card kg-image-card">
              <Img fluid={{ ...image.asset.fluid }} />
              <figcaption>{image.asset.caption || ""}</figcaption>
            </figure>
          </div>
        )}
        <BlockContent body={_rawBody} />

        <footer className="post-content-footer"></footer>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query SanityProjectById($id: String!) {
    sanityProject(id: { eq: $id }) {
      id
      title
      date
      image {
        asset {
          fluid(maxWidth: 900) {
            ...GatsbySanityImageFluid
          }
        }
      }
      _rawBody(resolveReferences: { maxDepth: 10 })
    }
  }
`
