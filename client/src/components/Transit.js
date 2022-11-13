import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";

function Transit(props) {

  const [tweets, setTweets] = useState({
    twitterUser: "@ttcnotices",
    twitterId: "19025957",
    tweetList: [],
  });

  useEffect(() => {
    axios.get("http://localhost:8080/count")
    .then(res => {
      console.log(res)
      setTweets({
        tweetList: (res.data),
      });
    })
    .catch((err) => {
      console.log("twitter get error:", err);
    });
  }, []);
  
  return (
    <>
    <div>
      {tweets.tweetList}
    </div>
    </>

  )
  
}

export default Transit;