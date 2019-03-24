const fs = require('fs')
const { promisify } = require('util')
const writeFile = promisify(fs.writeFile)
const { parse } = require('url')
const { IG_CLIENT_ID, IG_REDIRECT } = process.env
const authPath = `https://api.instagram.com/oauth/authorize/?client_id=${IG_CLIENT_ID}&redirect_uri=${IG_REDIRECT}&response_type=token`
const tokenPath = process.env.NODE_ENV === 'production' ? '/tmp/token.txt' : './token.txt'

async function setTokenManually(req, res) {

  const { query } = parse(req.url, true)

  if (query.access_token) {
    try {
      console.log('Setting token manually', query.access_token);
      await writeFile(tokenPath, query.access_token, 'utf8')
      return res.end()
    } catch (error) {
      res.statusCode = 500
      return res.end()
    }
  }
  
  res.setHeader('Location', authPath)
  res.statusCode = 302
  res.end()
}

module.exports = setTokenManually