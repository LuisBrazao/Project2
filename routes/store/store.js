const express = require('express');
const router = express.Router();
const Store = require("../../models/Store");
const Painting = require("../../models/Painting");

router.get("/store", (req, res) => {
  Store.count(function (err, count) {
    if (!err && count === 0) {
      let paintingsId = []
      let currentTime = new Date();
      let endTime = new Date();
      endTime.setMinutes(endTime.getMinutes() + 5)
      Painting.aggregate([{ $sample: { size: 4 } }])
        .then((paintings) => {
          paintings.forEach(element => {
            paintingsId.push({ paintingID: element._id })
          });
          Store.create({ selling: paintingsId, startTime: currentTime, endTime: endTime })
            .then(() => {
              Store.find()
                .then((result) => {
                  let store = [];
                  for (let i = 0; i < result[0].selling.length; i++) {
                    Painting.findById(result[0].selling[i].paintingID)
                      .then((paint) => {
                        store.push(paint)
                        if (i === result[0].selling.length - 1 && store.length === result[0].selling.length) {
                          res.render("Store/store", { paintings: store, user: req.session.currentUser })
                        }
                      }).catch((err) => {
                        console.log(err)
                      })
                  }
                }).catch((err) => {
                  console.log(err)
                })
            }).catch((err) => {
              console.log(err);
            })
        }).catch((err) => {
          console.log(err);
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
                    let store = [];
                    for (let i = 0; i < result[0].selling.length; i++) {
                      Painting.findById(result[0].selling[i].paintingID)
                        .then((paint) => {
                          store.push(paint)
                          if (i === result[0].selling.length - 1 && store.length === result[0].selling.length) {
                            res.render("Store/store", { paintings: store, user: req.session.currentUser })
                          }
                        }).catch((err) => {
                          console.log(err)
                        })
                    }
                  }).catch((err) => {
                    console.log(err)
                  })
              }).catch((err) => {
                console.log(err)
              })
          } else {
            let store = [];
            for (let i = 0; i < result[0].selling.length; i++) {
              Painting.findById(result[0].selling[i].paintingID)
                .then((paint) => {
                  store.push(paint)
                  if (i === result[0].selling.length - 1 && store.length === result[0].selling.length) {
                    res.render("Store/store", { paintings: store, user: req.session.currentUser })
                  }
                }).catch((err) => {
                  console.log(err)
                })
            }
          }
        }).catch((err) => {
          console.log(err);
        })
    };
  })
})



module.exports = router;
