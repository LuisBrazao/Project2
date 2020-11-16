const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { Mongoose } = require('mongoose');
const saltRounds = 10;

router.get("/register", (req, res) => {
  res.render("Auth/register")
})

router.get("/login", (req, res) => {
  res.render("Auth/login")
})

router.post("/register", (req, res) => {
  let { username, email, password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);
  if (username === "" || password === "") {
      res.render("Auth/register",
          {
              errorMessage: "Indicade Username and Password"
          })
      return;
  } else {
      User.findOne({ "username": username })
          .then((user) => {
              if (user) {
                  res.render("Auth/register",
                      {
                          errorMessage: "Username already exits"
                      })
                  return;
              }
              User.create({ username, email, password: hashPassword })
                  .then(() => {
                      res.redirect("/")
                  }).catch((error) => {
                      if (error.code === 11000) {
                          res.render("Auth/register",
                              {
                                  errorMessage: "Username and email need to be unique"
                              })
                      }
                       res.render("Auth/register", 
                      {
                          errorMessage: error
                      }) 
                  })
          })
  }
})

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  if (username === "" || password === "") {
      res.render("Auth/login",
          {
              errorMessage: "Indicade Username and Password"
          })
      return;
  }
  User.findOne({ "username": username })
      .then((user) => {
          if (!user) {
              res.render("Auth/login",
                  {
                      errorMessage: "Invalid login"
                  })
              return;
          }
          if(bcrypt.compareSync(password, user.password)){
              req.session.currentUser = user;
              res.redirect("/")
          }else{
              res.render("Auth/login", 
              {
                  errorMessage: "Invalid login"
              })
          }
      })

})

router.post("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
})


module.exports = router
