const micro = require('micro')
const handler = require('serve-handler');
require('dotenv').config()
// require('dotenv').config({ path: './.env.prod' }) // test with prod env

const index = require('./api/index')
const token = require('./api/token')
const scrape = require('./api/scrape')
const login = require('./api/login')

const routes = {
  '/api': index,
  '/api/token': token,
  '/api/scrape': scrape,
  '/api/login': login,
}

const server = micro(async (req, res) => {
  const route = routes[req.url]
  if(route) return await route(req, res)
  return handler(req, res, { public: 'src' })
})

server.listen(3000)