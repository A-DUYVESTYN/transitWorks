require('dotenv').config()
const {MONGO_URL} = process.env;
const mongoose = require('mongoose')

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL, {})
  .then( res => {
    console.log("----Database connection established----")
    console.log("----db connection str:", res.connections[0]._connectionString)
  })
  .catch(err => console.log(err));

const db = mongoose.connection

module.exports = db;
