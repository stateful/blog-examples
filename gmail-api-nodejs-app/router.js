const express = require('express');
const controllers=require('./controllers');
const router = express.Router();

router.get('/mail/user/:email',controllers.getUser)
router.get('/mail/send',controllers.sendMail);
router.get('/mail/drafts/:email', controllers.getDrafts);
router.get('/mail/read/:messageId', controllers.readMail);

module.exports = router;