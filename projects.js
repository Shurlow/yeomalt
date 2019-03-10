const spaceId = 'a16bgaeg0u0v'
const accessToken = 'cbced7be93391e5e2533daac88a3e9d48f22f133a49cefcac629043de3efd9fe'

const client = contentful.createClient({
  space: spaceId,
  accessToken: accessToken
})

function fetchProjects() {
  client.getEntries()
    .then((response) => {
      return response.items.map(project => {
        const images = project.fields.images.map(img => {
          return {
            title: img.fields.title,
            url: img.fields.file.url
          }
        })
        return {
          ...project.fields,
          images
        }
      })
    })
    .then(makeProjects)
    .catch(console.error)
}

fetchProjects()

const projectContainer = document.querySelector('#project-container')
function makeProjects(projects) {
  projectContainer.innerHTML = projects.map(projectCard).join('')
}

function projectCard({ title, description, location, images }) {
  return `
    <article class='project flex'>
      <div class="flex-basis pa3 pa3-ns bg-white black-70 f4 times">
        <header class="bb b--black-70 pv3">
          <h3 class="f3 fw7 ttu tracked lh-title mt0 mb3 avenir">${title}</h3>
          <h4 class="f4 fw4 i lh-title mt0">${location}</h4>
        </header>
        <section class="pt4">
          <p class="times lh-copy measure f5 mt0">${description}</p>
        </section>
      </div>
      <div class='flex-basis' style="background: url(${images[0].url}) no-repeat center center; background-size: cover;"></div>
    </article>
  `
}