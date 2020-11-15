const express = require('express');
const router  = express.Router();
const User = require("../../models/User");
const Painting = require("../../models/Painting");


/* GET home page */
router.post('/addWishlist/:id', (req, res, next) => {
  let {paintingID} = req.body;
  User.findByIdAndUpdate(req.session.currentUser,
    {$push: {wishlist: {paintingID}}}
  ).then((result) => {
    res.redirect(`/`)
  }).catch((err) => {
    console.log(err)
  })
});

module.exports = router;
