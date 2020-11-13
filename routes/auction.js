const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/auction', (req, res, next) => {
  res.render('Auction/auction');
});

module.exports = router;