const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const Painting = require("../../models/Painting");
const requireLogin = require("../../config/utils");
const Auction = require('../../models/Auction');
const Bid = require('../../models/Bid');
/* GET home page */
router.get('/all-auctions', (req, res, next) => {
  let finalAuctions = [];
  let finalAuction = {};
  Auction.find()
    .then((auctions) => {
      auctions.forEach((auction) => {
        Painting.findById(auction.selling)
          .then((paint) => {
            console.log(paint.title)
            User.findById(auction.owner)
              .then((user) => {
                if (!auction.currentBid) {
                  let finalAuction = {
                    endTime: auction.endTime,
                    paintingName: paint.title,
                    auctionOwner: user.username,
                    activePrice: auction.startPrice,
                    winning: "No bids yet",
                    aunctionID: auction._id
                  }
                  finalAuctions.push({ ...finalAuction });
                } else {
                  Bid.findById(auction.currentBid)
                    .then((bid) => {
                      User.findById(bid.bidOwner)
                        .then((user2) => {
                          let finalAuction = {
                            endTime: auction.endTime,
                            paintingName: paint.title,
                            auctionOwner: user.username,
                            activePrice: bid.bid,
                            winning: user2.username,
                            aunctionID: auction._id
                          }
                          finalAuctions.push({ ...finalAuction });
                        })
                    })
                }
              })
          })
      })
      res.render('Auction/auctions', { user: req.session.currentUser, auctions: finalAuctions });
    })
});

router.get('/my-auctions', (req, res, next) => {
  let finalAuctions = [];
  let finalAuction = {};
  Auction.find({ owner: req.session.currentUser })
    .then((auctions) => {
      auctions.forEach((auction) => {
        Painting.findById(auction.selling)
          .then((paint) => {
            if (!auction.currentBid) {
              let finalAuction = {
                endTime: auction.endTime,
                paintingName: paint.title,
                auctionOwner: req.session.currentUser,
                activePrice: auction.startPrice,
                winning: "No bids yet",
                aunctionID: auction._id
              }
              finalAuctions.push({ ...finalAuction });
            } else {
              Bid.findById(auction.currentBid)
                .then((bid) => {
                  User.findById(bid.bidOwner)
                    .then((user) => {
                      let finalAuction = {
                        endTime: auction.endTime,
                        paintingName: paint.title,
                        auctionOwner: req.session.currentUser,
                        activePrice: bid.bid,
                        winning: user.username,
                        aunctionID: auction._id
                      }
                      finalAuctions.push({ ...finalAuction });
                    })
                })
            }
          })
      })
      res.render('Auction/my-auctions', { user: req.session.currentUser, auctions: finalAuctions });

    })
})

router.get("/start-create", requireLogin, (req, res) => {
  User.findById(req.session.currentUser)
    .then((result) => {
      let owned = [];
      let painting = {};
      result.owned.forEach(element => {
        Painting.findById(element.paintingID)
          .then((paint) => {
            painting.name = paint.title;
            painting.id = paint._id;
            owned.push({ ...painting });
          })
      });
      res.render("Auction/create-auction", { user: req.session.currentUser, owned: owned })
    })
})

router.post("/create-auction", requireLogin, (req, res) => {
  let { paintingID, startPrice } = req.body;
  let startTime = new Date();
  let endTime = startTime.setMinutes(startTime.getMinutes() + 5)
  Auction.create({
    selling: paintingID,
    owner: req.session.currentUser,
    startPrice: startPrice,
    startTime: startTime,
    endTime: endTime
  })
    .then(() => {
      res.redirect("/my-auctions")
    })
})

module.exports = router;