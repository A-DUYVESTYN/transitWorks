require('dotenv').config()
const {MONGO_URL} = process.env;
const mongoose = require('mongoose')
const users = require('../seeds/usersSeed')
const User = require('../user.model')

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL, {})
  .then( res => {
    console.log("----Database connection established----")
  })
  .catch(err => console.log(err));
  
const seedDB = async () => {
  await User.deleteMany({})
  await User.insertMany(users)
  console.log("----DONE delete & reset users collection----")
}

seedDB().then(() => {
  mongoose.connection.close()
})