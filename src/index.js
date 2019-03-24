const feed = document.querySelector('#ig-feed')

function getRecentPosts() {
  fetch(`/api`)
    .then((res) => res.json())
    .then(posts => {
      feed.innerHTML = posts.map(imageCard).join('')
    })
    .catch(console.error)
}

getRecentPosts()

function imageCard(post) {
  return `
    <div class='card mb4' style="background-image: url('${post.images.standard_resolution.url}')"></div>
  `
}