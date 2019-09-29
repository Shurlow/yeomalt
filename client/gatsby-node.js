// import { path } from 'fs'
const path = require("path")
const { titleToLink } = require("./src/utils/links")
// import { titleToLink } from './src/utils/links'
// const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const ProjectPage = path.resolve(`./src/templates/ProjectPage.js`)

  return graphql(`
    query {
      allSanityProject {
        edges {
          node {
            id
            title
            date
            image {
              asset {
                url
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
  `)
    .then(result => {
      if (result.errors) {
        throw result.errors
      }

      const projects = result.data.allSanityProject.edges.map(
        ({ node }) => node
      )

      projects.forEach(({ title, id }, i) => {
        const previous = projects[i + 1] || null
        const next = projects[i - 1] || null

        createPage({
          path: titleToLink(title),
          component: ProjectPage,
          context: { id, previous, next },
        })
      })
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
