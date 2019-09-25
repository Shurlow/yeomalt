import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import ImageCard from "../components/ImageCard"

// import "../utils/global.scss"
import "../utils/normalize.css"
import "../utils/css/screen.css"
const hashtagRegEx = /\B(#[a-zA-Z0-9]+\b|\.)(?!;)/g

//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const Main = ({ data }, location) => {
  // const { title, description } = data.site.siteMetadata
  const imgChunk1 = data.allInstaNode.edges.slice(0, 4)
  const imgChunk2 = data.allInstaNode.edges.slice(4, 8)
  const imgChunk3 = data.allInstaNode.edges.slice(8)
  console.log(data.allInstaNode.edges, imgChunk1, imgChunk2, imgChunk3)
  // console.log(images)
  // console.log(images[0].node.caption.replace(hashtagRegEx, " "))

  return (
    <Layout>
      <SEO title="Home" />
      {/* <header className="page-head">
        <h2 className="page-head-title">Recent Work</h2>
      </header> */}
      <div className="post-feed">
        <ImageCardList images={imgChunk1} />
        <header className="page-head">
          <h6 className="post-feed-header">
            Custom metal fabrication based in Bellingham Washington.{" "}
            <Link to={`/projects`}>View projects.</Link>
          </h6>
        </header>
        <ImageCardList images={imgChunk2} />
        <header className="page-head">
          <h6 className="post-feed-header">
            <span>
              We specialize in a functional aesthetic woven with exocit metals.
            </span>{" "}
            <a
              href="mailto:studio@yeomaltdesign.com"
              title="Email"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact us
            </a>{" "}
            <span>for more information.</span>
          </h6>
        </header>
        <ImageCardList images={imgChunk3} />
      </div>
    </Layout>
  )
}

const ImageCardList = ({ images }) =>
  images.map((image, i) => (
    <ImageCard
      img={
        image.node.thumbnails[4].src ||
        image.node.localFile.childImageSharp.fixed.src
      }
      caption={image.node.caption.replace(hashtagRegEx, "")}
      count={i}
      key={`image-card-${i}`}
    />
  ))

// site {
//   siteMetadata {
//     title
//     description
//     shortName
//   }
// }
const indexQuery = graphql`
  query {
    allInstaNode(sort: { fields: [timestamp], order: DESC }) {
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
