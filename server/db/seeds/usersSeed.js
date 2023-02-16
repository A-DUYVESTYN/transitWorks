const User = require('../user.model')
const users = [
  new User({
    UserName: "Andy", 
    UserEmail: "andy@gmail.com", 
    UserPassword: "12345",
    TTCroutes: [1, 2, 80, 76, 15],
    TTCstations: ["Royal York", "St George"]
  }),
  new User({
    UserName: "Pat", 
    UserEmail: "pat@gmail.com", 
    UserPassword: "12345",
    TTCroutes: [2, 4, 112, 501, 504, 300, 952],
    TTCstations: ["Union", "Eglinton"]
  }),
  new User({
    UserName: "Zero", 
    UserEmail: "zero@gmail.com", 
    UserPassword: "12345",
    TTCroutes: [],
    TTCstations: []
  }),
]

module.exports = users
