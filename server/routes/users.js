const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const db = require('../db/db.config')
const User = require('../db/user.model')

// const getUserById = id => {
//   return User.findById({ _id: id})
// }

router.get('/', (req, res) => {
  User.find({}, function(err,data) {
    if (err) console.log(err)
    if (data) res.json(data)
  })
})

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .exec(function (err, data) {
      if (err) console.log(err)
      res.json(data)
    })

})

module.exports = router;
