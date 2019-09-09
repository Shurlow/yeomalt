import React from "react"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
// import Img from "gatsby-image"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

const serializers = {
  types: {
    figure: ({ node: { asset, alt, caption } }) => (
      <figure className="kg-card kg-image-card">
        <img className="kg-image" src={asset.url} alt={alt || ""} />
        <figcaption>{caption}</figcaption>
      </figure>
    ),
  },
}

export default function ProjectPage(props) {
  const {
    title,
    location,
    description,
    image,
    _rawBody,
  } = props.data.sanityProject
  console.log(props)
  return (
    // const post = this.props.data.markdownRemark

    <Layout location={location} title={title}>
      <SEO title={title} description={title} />
      <header className="page-head">
        <h2 className="page-head-title">{title}</h2>
      </header>
      <article className="post-content">
        {/* <header className="post-content-header">
            <h1 className="post-content-title">{title}</h1>
          </header> */}

        {description && <p class="post-content-excerpt">{description}</p>}

        {image && (
          <div className="post-content-image">
            <figure className="kg-card kg-image-card">
              <img
                className="kg-image"
                src={image.asset.url}
                alt={image.asset.caption || " "}
              />
              <figcaption>{image.asset.caption || ""}</figcaption>
            </figure>
            {/* <Img
                className="kg-image"
                fluid={thumbnail.childImageSharp.fluid}
                alt={title}
              /> */}
          </div>
        )}

        <BlockContent
          blocks={_rawBody}
          serializers={serializers}
          // imageOptions={{ w: 320, h: 240, fit: 'max' }}
          // projectId="myprojectid"
          // dataset="projects"
        />

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
          url
        }
      }
      _rawBody(resolveReferences: { maxDepth: 10 })
    }
  }
`
