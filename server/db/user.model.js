const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  UserName: {type: String, required: true }, 
  UserEmail: {type: String, required: true }, 
  UserPassword: {type: String, required: true }, 
  TTCroutes:{type: Array},
  TTCstations: {type: Array}
})

const User = mongoose.model("User", userSchema, "users")

module.exports = User;