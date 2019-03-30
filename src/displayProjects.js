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
  // <div class='dn db-l flex-basis mb2 mb0-l img-desktop' style="background: url(${images[0].url}) no-repeat center center; background-size: cover;"></div>
  return `
    <article class="project mb4 flex-l justify-center items-center">
      <img class="w-100 w-50-l" src="${images[0].url}"/>
      
      <div class="flex-basis pa4-l bg-white black-70 f4 times">
        <header class=" pt3">
          <h3 class="f4 fw6 ttu tracked lh-title mt0 mb1 avenir">${title}</h3>
          <h4 class="f5 fw4 i lh-title ma0">${location}</h4>
        </header>
        <section class="mt3">
          <p class="times lh-copy measure f5 mt0">${description}</p>
        </section>
      </div>
    </article>
  `
}