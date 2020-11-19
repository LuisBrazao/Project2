const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const Painting = require("../../models/Painting");
const requireLogin = require("../../config/utils")

router.get("/wishlist", requireLogin, (req, res) => {
  let paintings = [];
  User.findById(req.session.currentUser)
    .then((result) => {
      if (!result.wishlist.length) {
        res.render('unavailable', { user: req.session.currentUser, errorMessage: "You don't have any wishlisted paintings, go random paintings to start adding" })
      }
      for (let i = 0; i < result.wishlist.length; i++) {
        Painting.findById(result.wishlist[i].paintingID)
          .then((paint) => {
            paintings.push(paint)
            if (i === result.wishlist.length - 1 ) {
              res.render("Wishlist/wishlist", { paintings: paintings, user: req.session.currentUser })
            }
          })
      }
    })
})

router.post('/addWishlist/:id', (req, res, next) => {
  let paintingID = req.params.id;
  if (req.session.currentUser) {
    User.findById(req.session.currentUser)
      .then((result) => {
        let isInArray = result.wishlist.some(function (painting) {
          return painting.paintingID.equals(paintingID);
        });
        if (!isInArray) {
          User.findByIdAndUpdate(req.session.currentUser,
            { $push: { wishlist: { paintingID } } }
          ).then((result) => {
            res.redirect(`/showRandom`)
          }).catch((err) => {
            console.log(err)
          })
        } else {
          Painting.findById(paintingID)
            .then((painting) => {
              res.render('Painting/random', {
                painting: [painting],
                errorMessage: "You already have this painting in your wishlist"
                , user: req.session.currentUser
              });
            })
        }
      })
  } else {
    Painting.findById(paintingID)
      .then((painting) => {
        res.render('Painting/random', {
          painting: [painting],
          errorMessage: "Please login to add paintings to your account"
        });
      })
  }
});

module.exports = router;
