const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const removeFile = promisify(fs.unlink)
const axios = require('axios')

class Token {
  constructor(tokenPath, baseUrl) {
    this.data = null
    this.path = tokenPath
    this.api = baseUrl
  }

  async set(token) {
    this.data = token
    return await writeFile(this.path, token, 'utf8')
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
    this.set(data.access_token)
    return data.access_token
  }

  async del() {
    this.data = null
    return await removeFile(this.path)
  }

}

module.exports = Token