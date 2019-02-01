const clientId = '34fb69bdcab84d76a6da9592085840f3'
const redirect = 'http://localhost:8080/index.html'
const authPath = `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirect}&response_type=token`
const tempToken = '10682133324.34fb69b.be3a2c0e593d4d6ca637b3ddafd058d4'


// const button = document.querySelector('.load')
// button.addEventListener('click', function() {
//   window.location = authPath
// })

const feed = document.querySelector('#ig-feed')

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