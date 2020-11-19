const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const Painting = require("../../models/Painting");
const requireLogin = require("../../config/utils");
const Store = require('../../models/Store');

router.get("/owned", requireLogin, (req, res) => {
  let paintings = [];
  User.findById(req.session.currentUser)
    .then((result) => {
      if (!result.owned.length) {
        res.render('unavailable', { user: req.session.currentUser, errorMessage: "You don't have any paintings yet, go to the store to buy one!" })
      }
      for (let i = 0; i < result.owned.length; i++) {
        Painting.findById(result.owned[i].paintingID)
          .then((paint) => {
            paintings.push(paint)
            if (i === result.owned.length - 1) {
              res.render("Owned/owned", { paintings: paintings, user: req.session.currentUser })
            }
          })
      }
    })
})

router.post('/buy/:id', requireLogin, (req, res, next) => {
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
                ).then((user) => {
                  Painting.findByIdAndUpdate(paintingID, { canSell: canSell, sold: sold })
                    .then(() => {
                      req.session.currentUser = user;
                      res.redirect(`/store`)
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
          Store.find()
            .then((result) => {
              let currentTime = new Date();
              if (currentTime > result[0].endTime) {
                let paintingsId = []
                let currentTime = new Date();
                let endTime = new Date();
                endTime.setMinutes(endTime.getMinutes() + 1)
                Painting.aggregate([{ $sample: { size: 4 } }])
                  .then((paintings) => {
                    paintings.forEach(element => {
                      paintingsId.push({ paintingID: element._id })
                    });
                    Store.findByIdAndUpdate(result[0]._id, { selling: paintingsId, startTime: currentTime, endTime: endTime })
                      .then((result2) => {
                        let storePaintings = [];
                        result2.selling.forEach(element => {
                          Painting.findById(element.paintingID)
                            .then((paint) => {
                              storePaintings.push(paint)
                            }).catch((err) => {
                              console.log(err);
                            })
                        });
                        res.render("Store/store", { paintings: storePaintings, errorMessage: "You already own this painting.", user: req.session.currentUser })
                      }).catch((err) => {
                        console.log(err)
                      })
                  }).catch((err) => {
                    console.log(err)
                  })
              } else {
                let storePaintings = [];
                result[0].selling.forEach(element => {
                  Painting.findById(element.paintingID)
                    .then((paint) => {
                      storePaintings.push(paint)
                    }).catch((err) => {
                      console.log(err)
                    })
                });
                res.render("Store/store", { paintings: storePaintings, errorMessage: "You already own this painting", user: req.session.currentUser })
              }
            }).catch((err) => {
              console.log(err);
            })
        }
      });
  }
});


module.exports = router;
