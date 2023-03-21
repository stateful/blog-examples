# How to Use the Gmail API in Node.js - A Step-by-Step Tutorial

[![](https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg)](https://runme.dev/api/runme?repository=https://github.com/stateful/blog-examples.git&fileToOpen=gmail-api-nodejs-app/README.md)

These are the example files used by the blog post [*"How to Use the Gmail API in Node.js - A Step-by-Step Tutorial"*](https://stateful.com/blog/gmail-api-node-tutorial). Check it out for more details. To run the files you need to have [Node.js](https://nodejs.org/en/) installed.

## Gmail API Setup in Node.JS

In order to use any Google API, there are some prerequisite steps we need to perform. Please follow the step-by-step instructions from the original [blog post](https://stateful.com/blog/gmail-api-node-tutorial). Make sure to create a `.env` file as described in the post or run this with [Runme](https://runme.dev) and enter values dynamically before you continue:

```sh
export PORT=8000
export USER_EMAIL="<your-email>"
export CLIENT_ID="<your-client-id>"
export CLIENT_SECRET="<your-client-secret>"
export REDIRECT_URI="<your-redirect-uri>"
export REFRESH_TOKEN="<your-refresh-token>"
```

## Run Example

First, install all dependencies via:

```sh
npm install
```

then, start the API server:

```sh { background=true }
node app.js
```

You can now access the API via:

```sh
open http://localhost:8000
```

## Send Queries to API Server

In order to test the behavior of the example implementation, run the following queries to the API server:

### Test `getUser`

```sh
curl "http://localhost:8000/api/mail/user/$USER_EMAIL"
```

### Test `getDrafts`

```sh
curl "http://localhost:8000/api/mail/drafts/$USER_EMAIL"
```

### Test `readMail`

```sh
export EMAIL_ID="<YOUR_EMAIL_ID>"
curl http://localhost:8000/api/mail/read/17f63b4513fb51c0
```

### Test `sendMail`

```sh
curl http://localhost:8000/api/mail/send
```

---

If you experience any issues with the example or have questions on how to run it, please don't hesitate to [join us on Discord](https://discord.com/invite/BQm8zRCBUY)!
