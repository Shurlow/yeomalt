const path = require(`path`)
// const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const ProjectPage = path.resolve(`./src/components/ProjectPage.js`)

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

      const projects = result.data.allSanityProject.edges

      projects.forEach((project, index) => {
        const previous =
          index === projects.length - 1 ? null : projects[index + 1].node
        const next = index === 0 ? null : projects[index - 1].node

        const path = project.node.title.toLowerCase().replace(/%20| /g, "-")

        createPage({
          path,
          component: ProjectPage,
          context: {
            id: project.node.id,
            previous,
            next,
          },
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
