const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { Mongoose } = require('mongoose');
const saltRounds = 10;

router.get("/register", (req, res) => {
  res.render("auth/register")
})

router.get("/login", (req, res) => {
  res.render("auth/login")
})

router.post("/register", (req, res) => {
  let { username, email, password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);
  if (username === "" || password === "") {
      res.render("auth/register",
          {
              errorMessage: "Indicade Username and Password"
          })
      return;
  } else {
      User.findOne({ "username": username })
          .then((user) => {
              if (user) {
                  res.render("auth/register",
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
                          res.render("auth/register",
                              {
                                  errorMessage: "Username and email need to be unique"
                              })
                      }
                       res.render("auth/register", 
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
      res.render("auth/login",
          {
              errorMessage: "Indicade Username and Password"
          })
      return;
  }
  User.findOne({ "username": username })
      .then((user) => {
          if (!user) {
              res.render("auth/login",
                  {
                      errorMessage: "Invalid login"
                  })
              return;
          }
          if(bcrypt.compareSync(password, user.password)){
              req.session.currentUser = user;
              res.redirect("/")
          }else{
              res.render("auth/login", 
              {
                  errorMessage: "Invalid login"
              })
          }
      })

})




module.exports = router
