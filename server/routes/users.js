const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const db = require('../db/db.config')
const User = require('../db/user.model')

// get all users
router.get('/', (req, res) => {
  User.find()
    .then(allUsers => res.json(allUsers))
    .catch(err => res.status(400).json('get Error: ' + err))
})
// get specific user
router.get('/:id', (req, res) => {
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
  const newUser = new User({
    userName: req.body.username, 
    userEmail: req.body.email, 
    userPassword: req.body.password,
    ttcRoutes: [],
    ttcStations: []
  })
  newUser.save()
    .then(data => res.json({id: data._id}))
    .catch(err => {
      console.log(`Unsuccessful signup attempt`)
      res.status(400).json("Create user error: " + err)
    })
})

// log in user
router.put('/login', (req, res) => {
  User.findOne({ userEmail: req.body.email, userPassword: req.body.password}, {_id: 1})
    .then(data => {
      console.log(`login query return: ${data}`)
      res.json(data._id? {id: data._id} : null)
    })
    .catch(err => {
      console.log(`Unsuccessful login attempt. email:${req.body.email}, password:${req.body.password}`)
      res.status(400).json(err)
    })
})

module.exports = router;
