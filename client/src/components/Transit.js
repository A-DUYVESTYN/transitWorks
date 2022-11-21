import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";

function Transit(props) {

  const [tweets, setTweets] = useState({
    twitterUser: "@ttcnotices",
    twitterId: "19025957",
    tweetList: [],
  });

  const formatTweets = (tweetArr) => {
    // remove the link url from end of tweet text
    
    const formattedArr = [];
    // const maxLength = 125;
    tweetArr.forEach((element) => {
      let tweetText = element.text.slice(0, element.text.indexOf(" http"));
      // if (tweetText.length > maxLength) tweetText = tweetText.substring(0, maxLength) + "..." // cap tweet length to 125 char

      formattedArr.push({
        created_at: element.created_at,
        id: element.id,
        text: tweetText,
      });
    });

    return formattedArr;
  };


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/transit`)
    .then(res => {
      let formatData = formatTweets(res.data.data)
      console.log(formatData)
      setTweets({
        tweetList: formatData
      });
    })
    .catch((err) => {
      console.log("twitter GET error:", err);
    });
  }, []);
  
  return (
    <>
    <div>
      {tweets.tweetList.map((item, index) => {
        return (
          <div key={index} id={"tweet" + index}>
            <p>{item.text}</p>
          </div>
        );
      })}
    </div>
    </>

  )
  
}

export default Transit;