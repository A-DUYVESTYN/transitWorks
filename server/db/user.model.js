const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {type: String, required: true }, 
  userEmail: {type: String, required: true }, 
  userPassword: {type: String, required: true }, 
  ttcRoutes:{type: Array},
  ttcStations: {type: Array}
})

const User = mongoose.model("User", userSchema, "users")

module.exports = User;