import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import ImageCard from "../components/ImageCard"

// import "../utils/global.scss"
import "../utils/normalize.css"
import "../utils/css/screen.css"
const hashtagRegEx = /\B(#[a-zA-Z0-9]+\b|\.)(?!;)/g

//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const Main = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const images = data.allInstaNode.edges
  console.log(images)
  console.log(images[0].node.caption.replace(hashtagRegEx, " "))

  return (
    <Layout title={siteTitle}>
      <SEO title="All posts" />
      {/* <Bio /> */}
      {data.site.siteMetadata.description && (
        <header className="page-head">
          <h2 className="page-head-title">
            {data.site.siteMetadata.description}
          </h2>
        </header>
      )}
      <div className="post-feed">
        {images.map((image, i) => {
          return (
            <ImageCard
              img={
                image.node.thumbnails[4].src ||
                image.node.localFile.childImageSharp.fixed.src
              }
              caption={image.node.caption.replace(hashtagRegEx, "")}
              count={i}
              key={`image-card-${i}`}
            />
          )
        })}
      </div>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allInstaNode {
      edges {
        node {
          id
          mediaType
          preview
          original
          caption
          localFile {
            childImageSharp {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          thumbnails {
            src
            config_width
            config_height
          }
          dimensions {
            height
            width
          }
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <Main location={props.location} props data={data} {...props} />
    )}
  />
)
