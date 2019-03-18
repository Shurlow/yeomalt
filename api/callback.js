// const { parse } = require('url')
// const axios = require('axios')
// const qs = require('qs')
// const { IG_CLIENT_ID, IG_CLIENT_SECRET, IG_REDIRECT } = process.env

// module.exports = (req, res) => {
//   const { query } = parse(req.url, true)
//   console.log('HELLO callback', req.url, query);
//   // res.end('Hello')
  
//   const data = {
//     client_id: IG_CLIENT_ID,
//     client_secret: IG_CLIENT_SECRET,
//     redirect_uri: IG_REDIRECT,
//     grant_type: 'authorization_code',
//     code: query.code
//   }

//   const options = {
//     url: 'https://api.instagram.com/oauth/access_token',
//     method: 'POST',
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     data: qs.stringify(data),
//   };

//   axios(options)
//     .then(auth => getPosts(auth.data.access_token))
//     .then(result => {
//       res.setHeader('Content-Type', 'application/json');
//       res.end(JSON.stringify(result.data))
//     })
//     .catch(error => {
//       // console.error(error)
//       res.statusCode = 500
//       res.end()
//     })
// }

// function getPosts(access_token) {
//   return axios(`https://api.instagram.com/v1/users/self/media/recent?access_token=${access_token}`)
// }
