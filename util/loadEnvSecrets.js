const dotenv = require('dotenv')
const { parsed } = dotenv.config({ path: './.env.prod' })
const nowConfig = require('../now.json')
const resetSecret = require('./resetSecret')

function loadEnvSecrets(config) {
  for (const key in config) {
    const name = nowConfig.env[key]
    const value = parsed[key]

    resetSecret(name.slice(1), value)
      .then(() => console.log('-- Secret set --'))
      .catch(err => console.error(err.message))
  }
}

loadEnvSecrets(parsed)