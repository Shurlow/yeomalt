const tempToken = '10682133324.34fb69b.be3a2c0e593d4d6ca637b3ddafd058d4'
const bio = document.querySelector('#bio')

function getSelf() {
  // fetch(`https://api.instagram.com/v1/users/self/?access_token=${tempToken}`)
  fetch(`https://api.instagram.com/v1/users/self/media/recent?access_token=${tempToken}`)
    .then((res) => res.json())
    .then((json) => {
      const bioPost = json.data.find(post => post.tags.includes('yeomalt_bio'))
      bio.textContent = bioPost.caption.text
    })
    .catch(console.error)
}
getSelf()