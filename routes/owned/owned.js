const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const Painting = require("../../models/Painting");
const requireLogin = require("../../config/utils")

router.get("/owned", requireLogin, (req, res) => {
  let paintings = {
    paintings: []
  }
  User.findById(req.session.currentUser)
    .then((result) => {
      result.owned.forEach(element => {
        Painting.findById(element.paintingID)
          .then((paint) => {
            paintings.paintings.push(paint)
          })
      });
      res.render("Owned/owned", {paintings: paintings.paintings, user: req.session.currentUser})
    })
})

module.exports = router;
