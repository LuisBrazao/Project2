const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const Painting = require("../../models/Painting");


/* GET home page */
router.get('/showRandom', (req, res, next) => {
  Painting.aggregate([{ $sample: { size: 1 } }])
    .then((painting) => {
      res.render('Painting/random', {painting: painting});
    })
});

module.exports = router;
