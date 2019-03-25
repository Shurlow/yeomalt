const { IG_CLIENT_ID, IG_REDIRECT } = process.env
const authPath = `https://api.instagram.com/oauth/authorize/?client_id=${IG_CLIENT_ID}&redirect_uri=${IG_REDIRECT}&response_type=token`

async function login(req, res) {
  res.setHeader('Location', authPath)
  res.statusCode = 302
  res.end()
}

module.exports = login