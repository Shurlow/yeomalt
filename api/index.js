const url = require('url');
const axios = require('axios')
const instagramPath = 'https://api.instagram.com/v1/users/self/media/recent?access_token='

module.exports = async function getPosts(req, res) {
  // const url = `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}${req.url}`
  // const url = `https://yeomalt.now.sh/api`
  const url = `http://localhost:3000/api`
  // console.log('Running index route', url);
  
  try {
    const { data } = await axios(`${url}/token`)    
    const posts = await axios(instagramPath + data.access_token)
    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify(posts.data.data))
  } catch (error) {
    console.error(error.message)
  }

  try {
    console.log('-- deleting token --');
    await axios.delete(`${url}/token`)
  } catch (error) {
    console.error(error.message);
  } finally {
    res.statusCode = 500
    res.end('Internal error. Try again.')
  }
}