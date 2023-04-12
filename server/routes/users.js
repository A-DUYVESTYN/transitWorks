const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const db = require('../db/db.config')
const User = require('../db/user.model')
const bcrypt = require("bcryptjs");
const saltRounds = 10

// get all users
// router.get('/', (req, res) => {
//   User.find()
//     .then(allUsers => res.json(allUsers))
//     .catch(err => res.status(400).json('get Error: ' + err))
// })
// get specific user
router.get('/data/:id', (req, res) => {
  // console.log("Request for user data for user ID:", req.params.id)
  User.findById(req.params.id)
    .exec(function (err, data) {
      if (err) console.log(err)
      // console.log("Query returs data:")
      // console.log(data)
      res.json(data)
    })
})

// update user's ttc routes
router.put('/update/:id',(req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json({message: 'Success! User updated:', updated_user: user}))
    .catch(err => res.status(400).json('Error! ' + err))
})

//delete user
router.delete('/delete/:id', (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(success => res.json('Success! User deleted.'))
    .catch(err => res.status(400).json('delete error:' + err))
})

//create user 
router.post('/new',(req, res) => {
  console.log("received request to create user:", req.body)
  const newHashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
  const newUser = new User({
    userName: req.body.username, 
    userEmail: req.body.email, 
    userPassword: newHashedPassword,
    ttcRoutes: [],
    ttcStations: []
  })
  newUser.save()
    .then(data => {
      req.session.user_id = data._id
      res.json({id: data._id, message: "New user created"})
    })
    .catch(err => {
      console.log(`Unsuccessful signup attempt`)
      res.status(400).json(err)
    })
})

// log in user
router.put('/login', (req, res) => {
  console.log("Login attempt...")
  User.findOne({ userEmail: req.body.email})
    .then(data => {
      if (!data) {
        console.log("User does not exist")
        res.json({message: "Wrong username/password combination"})
      } 
      if (data) { 
        if (bcrypt.compareSync(req.body.password, data.userPassword)) {
          req.session.user_id = data._id
          console.log("req.session.user_id =", req.session.user_id)
          res.json({id: data._id, message: "User credentials verified"})
        } else {
          console.log("User exists, incorrect password")
          res.json({message: "Wrong username/password combination"})
        }
      }
    })
    .catch(err => {
      console.log(`Unsuccessful login: email:${req.body.email}, password:${req.body.password}`)
      console.log("error: ",err)
      res.json({message: "Query Error"})
    })
})

// check if user is logged in
router.get("/login", (req,res) => {
  const currentSession = req.session
  console.log("////////////// Verify user login:")
  console.log("req.session:", currentSession)
  if (currentSession?.user_id) {
    res.send({loggedIn: true, user: currentSession.user_id})
  } else {
    res.send({loggedIn: false, user: null})
  }
})

// logout
router.get('/logout', (req, res, next) => {
  console.log("Logging user out")
  req.session.user_id = null
  req.session.save(function (err) {
    if (err) next(err)
  })
  res.json({message: "logging out"})
})

module.exports = router;
