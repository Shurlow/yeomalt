const feed = document.querySelector('#ig-feed')

function getRecentPosts() {
  // fetch(`http://localhost:3000/api`)
    // .then((res) => res.json())
  axios.get('http://localhost:3000/api')
    .then(res => {
      console.log(res);
      // return axios.get(res.url)
    })
    .then(json => {
      console.log(json);
      
      // feed.innerHTML = json.data.map(imageCard).join('')
    })
    .catch(console.error)
}

getRecentPosts()

function imageCard(post) {
  return `
    <div class='card ma3'>
      <img src='${post.images.standard_resolution.url }'></img>
    </div>
  `
}