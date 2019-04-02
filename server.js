const micro = require('micro')
const handler = require('serve-handler');
require('dotenv').config()
// require('dotenv').config({ path: './.env.prod' }) // test with prod env

const index = require('./api/index')
const token = require('./api/token')
const scrape = require('./api/scrape')
const login = require('./api/login')
const projects = require('./api/projects')

const routes = {
  '/api': index,
  '/api/token': token,
  '/api/scrape': scrape,
  '/api/login': login,
  '/api/projects': projects
}

const server = micro(async (req, res) => {
  const route = routes[req.url]
  if(route) return await route(req, res)
  return handler(req, res, { public: 'src' })
})

server.listen(3000)