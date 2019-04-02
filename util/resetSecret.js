const axios = require('axios')
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.ZEIT_KEY}`;

async function resetSecret(name, value) {
  console.log('-- Resetting Secret --');
  try {
    await axios.delete(`https://api.zeit.co/v2/now/secrets/${name}`)
  } catch (error) {
    console.error('Could not delete secret', error)
  }

  return await axios.post('https://api.zeit.co/v2/now/secrets', { name, value })
}

module.exports = resetSecret