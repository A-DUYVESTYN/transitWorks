const axios = require('axios');
const express = require('express');
const router = express.Router();

const getTweets = () => {
  const twitterUserId = 19025957 // @ttcnotices twitter user ID
  const token = process.env.TWITTER_BEARER_TOKEN 
  const config = {
    method: 'get',
    url: `https://api.twitter.com/2/users/${twitterUserId}/tweets?max_results=20&tweet.fields=created_at`, 
    headers: { 
      Authorization: `Bearer ${token}`, 
      Cookie: 'guest_id=v1%3A166308728881496672'
    }
  }
  return axios(config)
  .then( (res) => {
    // console.log("####### Twitter respose data: ",(res.data));
    return res.data
  })
  .catch( (err) =>  {
    console.log(err);
  });
}

router.get('/', (req, res) => {
  getTweets()
  .then((data) => {
    res.json(data)
  })
})

module.exports = router;