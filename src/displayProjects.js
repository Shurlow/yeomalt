const spaceId = 'a16bgaeg0u0v'
const accessToken = 'cbced7be93391e5e2533daac88a3e9d48f22f133a49cefcac629043de3efd9fe'
const projectListId = '1YV3fafGWHqzSuQirjfZ3l'

window.onload = fetchProjects

function fetchProjects() {
  const client = contentful.createClient({
    space: spaceId,
    accessToken: accessToken
  })

  client.getEntry(projectListId)
    .then(response => {
      return response.fields.projectList.map(project => {
        const images = project.fields.images.map(img => {
          return { title: img.fields.title, url: img.fields.file.url }
        })
        return { ...project.fields, images }
      })
    })
    .then(makeProjects)
    .catch(console.error)
}

const projectContainer = document.querySelector('#project-container')
function makeProjects(projects) {
  projectContainer.innerHTML = projects.map(projectCard).join('')
}

function projectCard({ title, description, location, images }) {
  return `
    <article class='project mb1 flex'>
      <div class="flex-basis ma4 bg-white black-70 f4 times">
        <header class=" pt3">
          <h3 class="f4 fw6 ttu tracked lh-title mt0 mb2 avenir">${title}</h3>
          <h4 class="f5 fw4 i lh-title ma0">${location}</h4>
        </header>
        <section class="mt1">
          <p class="times lh-copy measure f5 mt0">${description}</p>
        </section>
      </div>
      <div class='flex-basis mv4 mh2' style="background: url(${images[0].url}) no-repeat center center; background-size: cover;"></div>
    </article>
  `
}