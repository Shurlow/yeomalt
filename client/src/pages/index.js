import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from "../components/postCard"

// import "../utils/global.scss"
import "../utils/normalize.css"
import "../utils/css/screen.css"
//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const BlogIndex = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allInstaNode.edges
  console.log(posts)
  console.log(
    posts[0].node.caption.replace(/\B(\#[a-zA-Z0-9]+\b|\.)(?!;)/g, " ")
  )

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
        {posts.map((post, i) => {
          return (
            <PostCard
              img={post.node.localFile.childImageSharp.fixed.src}
              caption={post.node.caption.replace(
                /\B(\#[a-zA-Z0-9]+\b|\.)(?!;)/g,
                ""
              )}
              count={i}
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
              fixed(width: 400) {
                base64
                width
                height
                src
                srcSet
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
      <BlogIndex location={props.location} props data={data} {...props} />
    )}
  />
)
