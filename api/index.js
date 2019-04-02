const axios = require('axios')
const { BASE_URL, ACCESS_TOKEN } = process.env
const instagramPath = 'https://api.instagram.com/v1/users/self/media/recent?access_token='
const { send, sendError } = require('micro')

module.exports = async function getPosts(req, res) {

  try {
    const token = ACCESS_TOKEN || (await axios(`${BASE_URL}/token`)).data.access_token
    const posts = await axios(instagramPath + token)
    res.setHeader('Cache-Control', 's-maxage=900')
    return send(res, 200, posts.data.data)
  } catch (error) {
    console.error('TOKEN ERROR HERE', error.message)
  }

  try {
    console.log('-- deleting token --');
    await axios.delete(`${BASE_URL}/token`)
  } catch (error) {
    console.error(error.message);
  } finally {
    sendError(res, 500, 'Internal server error. Try again.')
  }
}