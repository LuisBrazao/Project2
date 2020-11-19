const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const Painting = require("../../models/Painting");
const requireLogin = require("../../config/utils");
const Auction = require('../../models/Auction');
const Bid = require('../../models/Bid');

router.get('/all-auctions', requireLogin, (req, res, next) => {
  let finalAuctions = [];
  Auction.find()
    .then((auctions) => {
      for (let i = 0; i < auctions.length; i++) {
        Painting.findById(auctions[i].selling)
          .then((paint) => {
            User.findById(auctions[i].owner)
              .then((user) => {
                if (!auctions[i].currentBid) {
                  let finalAuction = {
                    endTime: auctions[i].endTime,
                    paintingName: paint.title,
                    auctionOwner: user.username,
                    paintingImg: paint.image_url,
                    activePrice: auctions[i].startPrice,
                    winning: "No bids yet",
                    auctionID: auctions[i]._id
                  }
                  console.log(finalAuction)
                  finalAuctions.push({ ...finalAuction });
                  if (i === auctions.length - 1) {
                    console.log(finalAuctions)
                    res.render('Auction/auctions', { user: req.session.currentUser, auctions: finalAuctions });
                  }
                } else {
                  Bid.findById(auctions[i].currentBid)
                    .then((bid) => {
                      User.findById(bid.bidOwner)
                        .then((user2) => {
                          let finalAuction = {
                            endTime: auctions[i].endTime,
                            paintingName: paint.title,
                            auctionOwner: user.username,
                            paintingImg: paint.image_url,
                            activePrice: bid.bid,
                            winning: user2.username,
                            auctionID: auctions[i]._id
                          }
                          finalAuctions.push({ ...finalAuction });
                          if (i === auctions.length - 1) {
                            console.log(finalAuctions)
                            res.render('Auction/auctions', { user: req.session.currentUser, auctions: finalAuctions });
                          }
                        })
                    })
                }
              })
          })
      }
    })
});

router.get('/my-auctions', requireLogin, (req, res, next) => {
  let finalAuctions = [];
  Auction.find({ owner: req.session.currentUser })
    .then((auctions) => {
      for (let i = 0; i < auctions.length; i++) {
        Painting.findById(auctions[i].selling)
          .then((paint) => {
            User.findById(auctions[i].owner)
              .then((user) => {
                if (!auctions[i].currentBid) {
                  let finalAuction = {
                    endTime: auctions[i].endTime,
                    paintingName: paint.title,
                    auctionOwner: user.username,
                    activePrice: auctions[i].startPrice,
                    winning: "No bids yet",
                    auctionID: auctions[i]._id
                  }
                  console.log(finalAuction)
                  finalAuctions.push({ ...finalAuction });
                  if (i === auctions.length - 1) {
                    console.log(finalAuctions)
                    res.render('Auction/auctions', { user: req.session.currentUser, auctions: finalAuctions });
                  }
                } else {
                  Bid.findById(auctions[i].currentBid)
                    .then((bid) => {
                      User.findById(bid.bidOwner)
                        .then((user2) => {
                          let finalAuction = {
                            endTime: auctions[i].endTime,
                            paintingName: paint.title,
                            auctionOwner: user.username,
                            activePrice: bid.bid,
                            winning: user2.username,
                            auctionID: auctions[i]._id
                          }
                          finalAuctions.push({ ...finalAuction });
                          if (i === auctions.length - 1) {
                            console.log(finalAuctions)
                            res.render('Auction/auctions', { user: req.session.currentUser, auctions: finalAuctions });
                          }
                        })
                    })
                }
              })
          })
      }
    })
})

router.get("/start-create", requireLogin, (req, res) => {
  User.findById(req.session.currentUser)
    .then((result) => {
      let owned = [];
      let painting = {};
      for (let i = 0; i < result.owned.length; i++) {
        Painting.findById(result.owned[i].paintingID)
          .then((paint) => {
            painting.name = paint.title;
            painting.id = paint._id;
            owned.push({ ...painting });
            if (i === result.owned.length - 1) {
              res.render("Auction/create-auction", { user: req.session.currentUser, owned: owned })
            }
          })
      }
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


router.get("/single-auction/:id", requireLogin, (req, res) => {
  let finalAuctions = [];
  let auctionID = req.params.id;
  Auction.findById(auctionID)
    .then((auction) => {
      Painting.findById(auction.selling)
        .then((paint) => {
          if (!auction.currentBid) {
            let finalAuction = {
              endTime: auction.endTime,
              paintingName: paint.title,
              auctionOwner: req.session.currentUser,
              activePrice: auction.startPrice,
              winning: "No bids yet",
              auctionID: auction._id,
              paintingImg: paint.image_url
            }
            finalAuctions.push({ ...finalAuction });
            res.render('Auction/auction-detail', { user: req.session.currentUser, auctions: finalAuctions });
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
                      auctionID: auction._id,
                      paintingImg: paint.image_url
                    }
                    finalAuctions.push({ ...finalAuction });
                    res.render('Auction/auction-detail', { user: req.session.currentUser, auctions: finalAuctions });
                  })
              })
          }
        })
    }).catch((err) => {
      console.log(err);
    })
})

router.post("/bid/:id", requireLogin, (req, res) => {
  let auctionID = req.params.id;
  let { bidAmount } = req.body;
  let currentTime = new Date();
  Auction.findById(auctionID)
    .then((auction) => {
      if (auction["currentBid"] === undefined && bidAmount > auction.startPrice && auction.owner != req.session.currentUser._id && auction.endTime > currentTime && req.session.currenUser.money > bidAmount) {
        Bid.create({ bidOwner: req.session.currentUser, bid: bidAmount })
          .then((bid) => {
            Auction.findByIdAndUpdate(auctionID, { currentBid: bid._id })
              .then(() => {
                User.findById(req.session.currentUser._id)
                  .then((user) => {
                    let newMoney = user.money - bidAmount;
                    User.findByIdAndUpdate(req.session.currentUser, { money: newMoney })
                      .then((user) => {
                        req.session.currentUser = user;
                        res.redirect(`/single-auction/${auctionID}`);
                      })
                  })
              })
          })
      } else if (auction["currentBid"] != undefined) {
        Bid.findById(auction.currentBid)
          .then((bid) => {
            if (bidAmount > bid.bid && auction.owner != req.session.currentUser._id && auction.endTime > currentTime && req.session.currenUser.money > bidAmount) {
              User.findById(bid.bidOwner)
                .then((user) => {
                  let newMoney = user.money + bid.bid;
                  User.findByIdAndUpdate(bid.bidOwner, { money: newMoney })
                    .then(() => {
                      let lessMoney = req.session.currentUser - bidAmount;
                      User.findByIdAndUpdate(req.session.currentUser._id, { money: lessMoney })
                        .then(() => {
                          req.session.currentUser = user;
                          Bid.create({ bidOwner: req.session.currentUser._id, bid: bidAmount })
                            .then((bid) => {
                              Auction.findByIdAndUpdate(auctionID, { currentBid: bid._id })
                                .then(() => {
                                  res.redirect(`/single-auction/${auctionID}`);
                                })
                            })
                        })
                    })
                })
            }
          })
      } else if (auction.owner === req.session.currentUser._id) {
        let errorMessage = "You can't bid on your own auction"
        res.redirect(`/single-auction/${auctionID}/error/${errorMessage}`);
      } else if (req.session.currenUser.money < bidAmount) {
        let errorMessage = "You don't have enough money to bid on this auction"
        res.redirect(`/single-auction/${auctionID}/error/${errorMessage}`);
      } else if (auction.endTime < currentTime) {
        let errorMessage = "This auction is close, you can no longer bid"
        res.redirect(`/single-auction/${auctionID}/error/${errorMessage}`);
      } else if (auction["currentBid"] === undefined && bidAmount < auction.startPrice) {
        let errorMessage = "Your bid is to low"
        res.redirect(`/single-auction/${auctionID}/error/${errorMessage}`);
      } else if (auction["currentBid"] != undefined) {
        Bid.findById(auction.currentBid)
          .then((bid) => {
            if (bidAmount < bid.bid) {
              let errorMessage = "Your bid is to low"
              res.redirect(`/single-auction/${auctionID}/error/${errorMessage}`);
            }
          })
      }
    })
})


router.get("/single-auction/:id/error/:error", requireLogin, (req, res) => {
  let finalAuctions = [];
  let auctionID = req.params.id;
  let errorMessage = req.params.error;
  Auction.findById(auctionID)
    .then((auction) => {
      Painting.findById(auction.selling)
        .then((paint) => {
          if (!auction.currentBid) {
            let finalAuction = {
              endTime: auction.endTime,
              paintingName: paint.title,
              auctionOwner: req.session.currentUser,
              activePrice: auction.startPrice,
              winning: "No bids yet",
              auctionID: auction._id,
              paintingImg: paint.image_url
            }
            finalAuctions.push({ ...finalAuction });
            res.render('Auction/auction-detail', { user: req.session.currentUser, auctions: finalAuctions, errorMessage: errorMessage });
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
                      auctionID: auction._id,
                      paintingImg: paint.image_url
                    }
                    finalAuctions.push({ ...finalAuction });
                    res.render('Auction/auction-detail', { user: req.session.currentUser, auctions: finalAuctions, errorMessage: errorMessage });
                  })
              })
          }
        })
    }).catch((err) => {
      console.log(err);
    })
})





module.exports = router;