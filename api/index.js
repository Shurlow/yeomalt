const { IG_CLIENT_ID, IG_REDIRECT } = process.env
const authPath = `https://api.instagram.com/oauth/authorize/?client_id=${IG_CLIENT_ID}&redirect_uri=${IG_REDIRECT}&response_type=token`
const axios = require('axios')
const getToken = require('./getToken')

async function getPosts(req, res) {
  try {
    const access_token = await getToken(authPath)
    const { data } = await axios(`https://api.instagram.com/v1/users/self/media/recent?access_token=${access_token}`)
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data.data))    
  } catch (error) {
    console.error(error);
    res.statusCode = 500
    res.end()
  }
};

module.exports = getPosts