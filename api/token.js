const { send, json, sendError } = require('micro')
const { NODE_ENV, BASE_URL } = process.env
const tokenPath = NODE_ENV === 'production' ? '/tmp/token.txt' : './token.txt'
const Token = require('../util/Token')
const AccessToken = new Token(tokenPath, BASE_URL)

// --- TOKEN CONTROLLERS ---

async function get(req, res) {
  const token = await AccessToken.get(req)
  send(res, 200, { access_token: token })
}

async function post(req, res) {
  let { access_token } = await json(req)
  console.log('Got token', access_token);

  await AccessToken.set(access_token)
  send(res, 200, { access_token })
}

async function del(req, res) {
  await AccessToken.del()
  send(res, 200, 'Token deleted.')
}

// --- Lambda Routes ---

const methods = {
  'GET': get,
  'POST': post,
  'DELETE': del
}

module.exports = async function token(req, res) {
  
  const method = methods[req.method]
  if(!method) return sendError(res, 404)

  try {    
    await method(req, res)
  } catch (error) {
    console.log('Caught token method error', error);
    sendError(req, res, error)
  }
  
}