# Getting Started with Create React App

[![](https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg)](https://runme.dev/api/runme?repository=https://github.com/stateful/blog-examples.git&fileToOpen=google-calendar-react/README.md)

This project is an example project from the Stateful blog post on: [*Using the Google Calendar API in React.js: An In-Depth Guide*](https://stateful.com/blog/google-calendar-react). You can interactively run through the example using [Runme](https://runme.dev/).

## Prerequisites

First, export necessary environment variables, via:

```sh
export REACT_APP_GOOGLE_API_KEY="<REACT_APP_GOOGLE_API_KEY>"
export REACT_APP_GOOGLE_ACCESS_TOKEN="<REACT_APP_GOOGLE_ACCESS_TOKEN>"
export REACT_APP_CALENDAR_ID="<REACT_APP_CALENDAR_ID>"
```

Make sure to follow the blog post on how to acquire these tokens.

## Install Dependencies

Run:

```sh
npm install
```

## Run Application

Runs the app in the development mode.

```sh { background=true }
npm start
```

The page will reload when you make changes.  
You may also see any lint errors in the console.

## Other Scripts

### `npm test`

Launches the test runner in the interactive watch mode.\

```sh
npm test
```

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\

```sh
npm run build
```

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

---

If you experience any issues with the example or have questions on how to run it, please don't hesitate to [join us on Discord](https://discord.com/invite/BQm8zRCBUY)!
