const express = require('express');
const app = express();
const path = require('path');
const PORT = 8888;

const db = require('../db.json');

const router = express.Router();

const buildRandomString = require('../utils/generator');

// ROUTING

router.get('/eggs', (req, res, next) => {
  res.json(db.foods.eggs);
});
router.get('/milks', (req, res, next) => {
  res.json(db.foods.milks);
});
router.get('/cheese', (req, res, next) => {
  res.json(db.foods.cheese);
});
router.get('/meat', (req, res, next) => {
  res.json(db.foods.meat);
});
router.get('/grains', (req, res, next) => {
  res.json(db.foods.grains);
});
router.get('/brands', (req, res, next) => {
  res.json(db.foods.brands);
});
router.get('/vegetables', (req, res, next) => {
  res.json(db.foods.vegetables);
});
router.get('/full-list', (req, res, next) => {
  res.json(db);
});
router.get('/random/:number', (req, res, next) => {
  res.send(buildRandomString(req.params.number));
});

app.use('/api', router);

// Setting port
app.listen(PORT, () => {
  console.log(`Your API is running on https://localhost:${PORT}`);
})
