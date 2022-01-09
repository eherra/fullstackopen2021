const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis')

/* GET statistics . */
router.get('/', async (_, res) => {
  let counterValue = await getAsync('counter');
  if (!counterValue) {
    counterValue = 0;
  }
  res.send({
    "added_todos": counterValue
  });
});

module.exports = router;