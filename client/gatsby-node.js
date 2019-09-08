const path = require(`path`)
// const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  // const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      query {
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
              # Only available with the public api scraper
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
  )
    .then(result => {
      if (result.errors) {
        throw result.errors
      }

      // Create blog posts pages.
      const posts = result.data.allInstaNode.edges

      // posts.forEach((post, index) => {
      //   const previous = index === posts.length - 1 ? null : posts[index + 1].node
      //   const next = index === 0 ? null : posts[index - 1].node

      //   createPage({
      //     path: post.node.fields.slug,
      //     component: blogPost,
      //     context: {
      //       slug: post.node.fields.slug,
      //       previous,
      //       next,
      //     },
      //   })
      // })

      //   return null
    })
    .catch(err => {
      console.error("BIG ERROR!", err)
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  // const { createNodeField } = actions
  // if (node.internal.type === `MarkdownRemark`) {
  //   const value = createFilePath({ node, getNode })
  //   createNodeField({
  //     name: `slug`,
  //     node,
  //     value,
  //   })
  // }
}
