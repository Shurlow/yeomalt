const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const removeFile = promisify(fs.unlink)
const axios = require('axios')
const resetSecret = require('./resetSecret')

class Token {
  constructor(tokenPath, baseUrl) {
    this.data = null
    this.path = tokenPath
    this.api = baseUrl
  }

  async set(token) {
    this.data = token
    try {
      await writeFile(this.path, token, 'utf8') // cache token in tmp file for warm lambda
      return await resetSecret('access-token', token) // save token in secret for future lambda calls
    } catch (error) {
      console.log('Error setting secret', error);
    }
  }

  async get(req) {
    if (this.data) return this.data

    // Read token from file
    try {
      const token = await readFile(this.path, 'utf8')
      return token
    } catch (error) {
      console.error(error.message)
    }

    // Scrape token with oauth flow
    const { data } = await axios(`${this.api}/scrape`)
    return data.access_token
  }

  async del() {
    this.data = null
    return await removeFile(this.path)
  }

}

module.exports = Token