const User = require('../user.model')
const users = [
  new User({
    userName: "Andy", 
    userEmail: "andy@gmail.com", 
    userPassword: "12345",
    ttcRoutes: [1, 2, 80, 76, 15],
    ttcStations: ["Royal York", "St George"]
  }),
  new User({
    userName: "Pat", 
    userEmail: "pat@gmail.com", 
    userPassword: "12345",
    ttcRoutes: [2, 4, 112, 501, 504, 300, 952],
    ttcStations: ["Union", "Eglinton"]
  }),
  new User({
    userName: "Zero", 
    userEmail: "zero@gmail.com", 
    userPassword: "12345",
    ttcRoutes: [],
    ttcStations: []
  }),
]

module.exports = users
