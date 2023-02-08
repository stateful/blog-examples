require("dotenv").config();

const auth = {
  type: "OAuth2",
  user: process.env.USER_EMAIL,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

const mailoptions = {
  from: `Max Mustermann <${process.env.USER_EMAIL}>`,
  to: process.env.USER_EMAIL,
  subject: "Gmail API NodeJS",
};

module.exports = {
  auth,
  mailoptions,
};