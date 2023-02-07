const express = require("express");
const routes = require("./router");

require("dotenv").config();

const app = express();

if (!process.env.PORT) {
  throw new Error('port environment variable not defined, make sure to setup the environment first')
}

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});

app.get("/", async (req, res) => {
  res.send("Welcome to Gmail API with NodeJS");
});

app.use('/api', routes)