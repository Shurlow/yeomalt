import React, { Fragment } from "react"
import { graphql, StaticQuery, Link } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import ImageCard from "../components/ImageCard"

// import "../utils/global.scss"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../utils/normalize.css"
import "../utils/css/screen.css"
const hashtagRegEx = /\B(#[a-zA-Z0-9]+\b|\.)(?!;)/g

//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const Main = ({ data }, location) => {
  const imgChunk1 = data.allInstaNode.edges.slice(0, 4)
  const imgChunk2 = data.allInstaNode.edges.slice(4, 8)
  const imgChunk3 = data.allInstaNode.edges.slice(8)
  const copy1 = data.sanityAboutContent.homepageCopy1
  const copy2 = data.sanityAboutContent.homepageCopy2

  return (
    <Layout>
      <SEO title="Home" />
      <div className="post-feed">
        <ImageCardList images={imgChunk1} />
        <CopyInsert text={copy1} link={<ProjectsLink />} />
        <ImageCardList images={imgChunk2} />
        <CopyInsert text={copy2} link={<EmailLink />} />
        <ImageCardList images={imgChunk3} />
      </div>
    </Layout>
  )
}

const CopyInsert = ({ text, link }) => (
  <header className="page-head">
    <h6 className="post-feed-header">
      {text} {link}
    </h6>
  </header>
)

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

const EmailLink = () => (
  <Fragment>
    <a
      href="mailto:studio@yeomaltdesign.com"
      title="Email"
      target="_blank"
      rel="noopener noreferrer"
    >
      Contact us
    </a>{" "}
    <span>for more information.</span>
  </Fragment>
)

const ProjectsLink = () => <Link to={`/projects`}>View projects.</Link>

const indexQuery = graphql`
  query {
    sanityAboutContent {
      id
      homepageCopy1
      homepageCopy2
    }
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
