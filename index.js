const authPath = 'https://api.instagram.com/oauth/authorize/?client_id=a30dc2a7c4e443a89f1d5ad922b83ee8&redirect_uri=http://localhost:8080/index.html&response_type=token'
const tempToken = '1371017427.a30dc2a.c086675162e6423ea867073f50f55dd2'

const feed = document.querySelector('#ig-feed')
// const button = document.querySelector('.load')
// button.addEventListener('click', function() {
//   window.location = authPath
// })

function getRecentPosts() {
  fetch(`https://api.instagram.com/v1/users/self/media/recent?access_token=${tempToken}`)
    .then((res) => res.json())
    .then((json) => {
      feed.innerHTML = json.data.map(imageCard).join('')
    })
    .catch(console.error)
}

getRecentPosts()

function imageCard(post) {
  return `
    <div class='card'>
      <img src='${post.images.standard_resolution.url }'></img>
    </div>
  `
}