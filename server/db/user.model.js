const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  UserName: {type: String}, 
  UserEmail: {type: String}, 
  TTCroutes:{type: Array},
  TTCstations: {type: Array}
})

const User = mongoose.model("User", userSchema, "users")

module.exports = User;