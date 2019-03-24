const fs = require('fs');
const { promisify } = require('util')
const stat = promisify(fs.stat)
const readFile = promisify(fs.readFile)
const http = require('http');
const url = require('url');
require('dotenv').config()

const express = require('express')
const app = express()

const asyncRoute = route => (req, res) => {
  Promise.resolve(route(req, res)).catch(console.error)
}

app.use(express.static('src'))

const index = require('./api/index')
const token = require('./api/token')
const scrape = require('./api/scrape')
const login = require('./api/login')

app.use('/api/token', asyncRoute(token))
app.use('/api/scrape', asyncRoute(scrape))
app.use('/api/login', asyncRoute(login))
app.use('/api', asyncRoute(index))

app.get('/:filename', (req, res, next) => {
  console.log(`${__dirname}/src/${req.params.filename}.html`);
  
  res.sendFile(`${__dirname}/src/${req.params.filename}.html`)
})


app.use((req, res, next) => {
  res.sendStatus(404)
})

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500)
})

app.listen(3000)



// const routes = {
//   '/api': index,
//   '/api/token': token,
//   '/api/scrape': scrape,
//   '/api/login': login,
// }

// const server = http.createServer(async (req, res) => {
  
//   const { pathname } = url.parse(req.url)
//   const route = routes[pathname]
//   req.headers['x-forwarded-proto'] = 'http' // patch header with protocol in dev only
//   if (route) return route(req, res)

//   // No matching route, look for static file
//   try {
//     const filedata = await serveFile(`src/${pathname}`)
//     res.end(filedata)
//   } catch (error) {
//     // No matching file, send 404
//     res.statusCode = 404
//     res.end()
//   }
// })


// async function serveFile(path) {
//   try {
//     await stat(path)
//     return await readFile(path, 'utf-8')
//   } catch (error) {
//     console.error(error)
//   }
// }

// server.listen(3000, () => {
//   console.log("Server listening on port 3000");
// });