const express = require('express');
const router = express.Router();
const Painting = require('../models/Painting')
function requireLogin(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/login');
  }
}

/* GET home page */
router.get('/', (req, res, next) => {
  Painting.aggregate([{ $sample: { size: 1 } }])
    .then((painting) => {
      req.app.locals.loggedUser = req.session.currentUser;
      res.render('index', { user: req.session.currentUser, painting: painting })
    })
    ;
});



module.exports = router;