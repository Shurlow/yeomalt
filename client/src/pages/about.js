import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import BlockContent from "../components/BlockContent"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const {
    aboutPageTagline,
    aboutPageImage,
    _rawAboutPageCopy,
  } = data.sanityAboutContent

  return (
    <Layout title={siteTitle}>
      <SEO title="About" />

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <figure className="kg-image-card kg-width-full relative">
            <Img fluid={aboutPageImage.asset.fluid} />
            <h2>{aboutPageTagline}</h2>
          </figure>
          <BlockContent body={_rawAboutPageCopy} />
          {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/ts0d7I6m7GE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
        </div>
      </article>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    sanityAboutContent {
      id
      aboutPageTagline
      aboutPageImage {
        asset {
          fluid(maxWidth: 900) {
            ...GatsbySanityImageFluid
          }
        }
      }
      _rawAboutPageCopy(resolveReferences: { maxDepth: 10 })
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <AboutPage location={props.location} data={data} {...props} />
    )}
  />
)
