const User = require('../user.model')
const bcrypt = require("bcryptjs")
const users = [
  new User({
    userName: "Andy", 
    userEmail: "andy@gmail.com", 
    userPassword: bcrypt.hashSync("12345", 10),
    ttcRoutes: [1, 2, 80, 76, 15],
    ttcStations: ["Royal York", "St George"]
  }),
  new User({
    userName: "Pat", 
    userEmail: "pat@gmail.com", 
    userPassword: bcrypt.hashSync("12345", 10),
    ttcRoutes: [2, 4, 112, 501, 504, 300, 952],
    ttcStations: ["Union", "Eglinton"]
  }),
  new User({
    userName: "Zero", 
    userEmail: "zero@gmail.com", 
    userPassword: bcrypt.hashSync("12345", 10),
    ttcRoutes: [],
    ttcStations: []
  }),
]

module.exports = users
