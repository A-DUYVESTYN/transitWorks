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
    axios.get("http://localhost:8080/ttcTwit")
    .then(res => {
      console.log(res)
      setTweets({
        tweetList: (res.data),
      });
    })
    .catch((err) => {
      console.log("twitter GET error:", err);
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