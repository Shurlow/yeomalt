# Yeomalt
Yemoalt Design website at [yeomaltdesign.com]()

Hosted with [https://zeit.co/now](now)

### Local Development

Install dev dependencies to serve static files in `/src` and spin-up lambdas:

```
npm i
npm run dev
```

Use `curl` to test lambdas separately:

```
curl localhost:3000/api
```

#### Routes:

- `/api`
- `/api/token`
- `/api/projects`

### Deploying to Now

Use the `now` cli to deploy.

The secrets listed in `now.json` must be loaded to deploy. Run `node util/loadEnvSecrets.js` to upload `.env.prod` variables as now secrets.

### TODO:

- make Yeomalt a link
- fix nav links on mobile
- deafult work page boxes on load