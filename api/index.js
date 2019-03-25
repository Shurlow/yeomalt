const url = require('url');
const axios = require('axios')
const { BASE_URL } = process.env
const instagramPath = 'https://api.instagram.com/v1/users/self/media/recent?access_token='
const { send } = require('micro')

module.exports = async function getPosts(req, res) {
  console.log('Running index route');

  try {
    const { data } = await axios(`${BASE_URL}/token`)
    const posts = await axios(instagramPath + data.access_token)
    return send(res, 200, posts.data.data)
  } catch (error) {
    console.error('TOKEN ERROR HERE', error.message)
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