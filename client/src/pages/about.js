import React from "react"
import { graphql, StaticQuery } from "gatsby"
// import Img from "gatsby-image"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO title="About" />

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          {/* <h2 id="blockquote">
            <strong>Yeomalt is a design studio located in Bellingham, Washington
            specializing in design process, and metal fabrication.</strong>
          </h2> */}
          <figure className="kg-image-card kg-width-full">
            <img
              src={"https://media.giphy.com/media/4No3LjxxOrhEjuTI4G/giphy.gif"}
              className="kg-image"
              alt="In process of building observation structure."
            />
            <figcaption>
              Observation Structure @ Arcadia Wildlife Sanctuary | Easthampton,
              MA
            </figcaption>
          </figure>
          <h4>
            Yeomalt is a design studio located in Bellingham, Washington
            specializing in design process, and metal fabrication.
          </h4>
          <h3 id="dynamic-styles">Custom Metal</h3>
          <p>
            Billions upon billions a mote of dust suspended in a sunbeam radio
            telescope a billion trillion vanquish the impossible courage of our
            questions. Emerged into consciousness Apollonius of Perga with
            pretty stories for which there's little good evidence take root and
            flourish extraordinary claims require extraordinary evidence
            citizens of distant epochs.
          </p>

          {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/ts0d7I6m7GE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}

          <p>
            Made in the interiors of collapsing stars take root and flourish
            extraordinary claims require extraordinary evidence descended from
            astronomers great turbulent clouds two ghostly white figures in
            coveralls and helmets are soflty dancing and billions upon billions.
          </p>
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
