require('dotenv').config()
const getPosts = require('./api/index')
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const urlParts = url.parse(req.url)
  
  if (urlParts.pathname === '/api') {
    return getPosts(req, res)
  }

  return res.end('Authenticaion complete.')
})

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});