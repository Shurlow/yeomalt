# Yeomalt
Yemoalt Design website at [yeomaltdesign.com]()

Hosted with `now`

### Local Development

Install dev dependencies to serve static files in `/src` and spin-up the lambda:

```
npm i
npm start
```

To test the lambda separately run:

```
npm run server
curl localhost:3000/api
```

### Deploying to Now

Use the `now` cli to deploy.
The following secrets must be set on now for the api:

* ig-client-id
* ig-client-secret
* ig-redirect
* ig-username
* ig-password