const { send, sendError } = require('micro')
const contentful = require('contentful')
const { CONTENTFUL_TOKEN } = process.env
const spaceId = 'a16bgaeg0u0v'
const projectListId = '1YV3fafGWHqzSuQirjfZ3l'

const client = contentful.createClient({
  space: spaceId,
  accessToken: CONTENTFUL_TOKEN
})

function formatProjects(projects) {
  return projects.fields.projectList.map(project => {
    const images = project.fields.images.map(img => {
      return { title: img.fields.title, url: img.fields.file.url }
    })
    return { ...project.fields, images }
  })
}

module.exports = async function getProjects(req, res) {
  try {
    const response = await client.getEntry(projectListId)
    const projects = formatProjects(response)
    res.setHeader('Cache-Control', 's-maxage=900')
    return send(res, 200, projects)
  } catch (error) {
    console.error('Contentful Error', error.message)
    sendError(res, 500)
  }
}