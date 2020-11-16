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
                  let storePaintings = [];
                  result[0].selling.forEach(element => {
                    Painting.findById(element.paintingID)
                      .then((paint) => {
                        storePaintings.push(paint)
                      })
                  });
                  res.render("Store/store", { paintings: storePaintings })
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
                    console.log(result2)
                    let storePaintings = [];
                    result2[0].selling.forEach(element => {
                      Painting.findById(element.paintingID)
                        .then((paint) => {
                          storePaintings.push(paint)
                        }).catch((err) => {
                          console.log(err);
                        })
                    });
                    res.render("Store/store", { paintings: storePaintings })
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
            res.render("Store/store", { paintings: storePaintings })
          }
        }).catch((err) => {
          console.log(err);
        })
    };
  })
})



module.exports = router;
