const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const removeFile = promisify(fs.unlink)
const axios = require('axios')
const tokenPath = process.env.NODE_ENV === 'production' ? '/tmp/token.txt' : './token.txt'
let access_token = null

module.exports = async function token(req, res) {
  
  // Handle token delete
  if (req.method === 'DELETE') {
    console.log('Handle DELETE token')
    try {
      await clearToken()
      return res.end('Token deleted.')
    } catch (error) {
      res.statusCode = 500
      return res.end('Error deleting token...')
    }
  }

  try {
    const token = await getToken(req)
    await setToken(token)
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ access_token }))
  } catch (error) {
    console.error('Error getting token', error.message)
    res.statusCode = 500
    res.end()
  }
}

async function getToken(req) {
  // Use token in memory
  if (access_token) return access_token
  
  // Read token from file
  try {
    const token = await readFile(tokenPath, 'utf8')
    return token
  } catch (error) {
    console.error(error.message)
  }

  // Scrape token with oauth flow
  try {    
    const { data } = await axios(`https://${req.headers.host}/api/scrape`)
    return data.access_token
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

function setToken(token) {
  access_token = token
  return writeFile(tokenPath, token, 'utf8')
}

function clearToken() {
  access_token = null
  return removeFile(tokenPath)
}