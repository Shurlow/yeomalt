import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { titleToLink } from "../utils/links"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const ProjectCard = ({ title, date, image }) => (
  <Link to={titleToLink(title)}>
    <figure className="kg-image-card">
      <h6>{title}</h6>
      <Img fluid={{ ...image.asset.fluid, aspectRatio: 16 / 9 }} />
      <figcaption>{`${date.toLocaleString("default", {
        month: "long",
      })} - ${date.getFullYear()}`}</figcaption>
    </figure>
  </Link>
)

const ProjectsPage = ({ data }, location) => {
  const { title } = data.site.siteMetadata
  const projects = data.allSanityProject.edges

  return (
    <Layout title={title}>
      <SEO title="Projects" />
      <article className="post-content page-template no-image">
        <div className="post-content-body flex-projects">
          {projects.map(({ node }) => (
            <ProjectCard key={node.id} {...node} date={new Date(node.date)} />
          ))}
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
    allSanityProject {
      edges {
        node {
          id
          title
          date
          image {
            asset {
              fluid(maxWidth: 700) {
                ...GatsbySanityImageFluid
              }
            }
          }
          body {
            _key
            _type
            style
            list
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
      <ProjectsPage location={props.location} data={data} {...props} />
    )}
  />
)
