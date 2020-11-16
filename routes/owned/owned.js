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
      res.render("Owned/owned", { paintings: paintings.paintings, user: req.session.currentUser })
    })
})

router.post('/buy/:id', (req, res, next) => {
  let paintingID = req.params.id;
  if (req.session.currentUser) {
    User.findById(req.session.currentUser)
      .then((result) => {
        let isInArray = result.owned.some(function (painting) {
          return painting.paintingID.equals(paintingID);
        });
        if (!isInArray) {
          let canSell = true;
          let sold = 0;
          Painting.findById(paintingID)
            .then((paint) => {
              console.log(paint)
              if (paint.canSell && paint.price <= result.money) {
                let newMoney = result.money - paint.price;
                if (paint.sold + 1 > paint.total) {
                  canSell = false;
                  sold = paint.sold + 1;
                } else {
                  canSell = true;
                  sold = paint.sold + 1;
                }
                User.findByIdAndUpdate(req.session.currentUser,
                  { $push: { owned: { paintingID } }, money: newMoney }
                ).then(() => {
                  Painting.findByIdAndUpdate(paintingID, { canSell: canSell, sold: sold })
                    .then(() => {
                      res.redirect(`/owned`)
                    }).catch((err) => {
                      console.log(err);
                    })
                }).catch((err) => {
                  console.log(err)
                })
              }
            }).catch((err) => {
              console.log(err)
            })

        } else {
          Painting.findById(paintingID)
            .then((painting) => {
              res.render('Painting/random', {
                painting: [painting],
                errorMessage: "You already have this painting in your collection"
              });
            }).catch((err) => {
              console.log(err)
            })
        }
      }).catch((err) => {
        console.log(err);
      })
  } else {
    Painting.findById(paintingID)
      .then((painting) => {
        res.render('Painting/random', {
          painting: [painting],
          errorMessage: "Please login to add paintings to your account"
        });
      }).catch((err) => {
        console.log(err)
      })
  }
});


module.exports = router;
