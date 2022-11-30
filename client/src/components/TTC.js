import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import TTCItem from "./TTCItem";
// const classNames = require('classnames');

function TTC(props) {

  const [tweets, setTweets] = useState({
    twitterUser: "@ttcnotices",
    twitterId: "19025957",
    tweetList: [],
  });
  // const routes = [1,2,3,4,301,304,306,310,501,503,504,505,506,509,510,511,512]
  // bus routes not included in routes array: 7 to 189, 300 to 396 (blue night), 400-405 (community bus), 900 - 996 (express)

  const formatTweets = (tweetArr) => {
    const getRouteColor = function (num) {
      //NOTE: the className must appear in its entirety e.g. 'bg-[#f8c300]' for tailwind to extract & compile it
      if (num === 1) return 'bg-[#f8c300]'
      if (num === 2) return 'bg-[#00923f]'
      if (num === 3) return 'bg-[#0082c9]'
      if (num === 4) return 'bg-[#a21a68]'
      if (num < 300) return 'bg-[#da251d]'
      if (num < 400) return 'bg-[#024182]'
      if (num < 500) return 'bg-[#808080]'
      if (num < 900) return 'bg-[#da251d]'
      if (num > 900) return 'bg-[#00923f]'
    }
    const formattedArr = [];
    tweetArr.forEach((element) => {
      const tweetText = element.text.slice(0, element.text.indexOf(" http")); // remove the link url from end of tweet text
      const routeNumber = 2
      const routeType = "Line 2"
      const routeColor = getRouteColor(routeNumber)
      console.log(routeColor)

      formattedArr.push({
        created_at: element.created_at,
        id: element.id,
        text: tweetText,
        routeNumber,
        routeType,
        routeColor
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
    <div className="flex-col">
      <h1>TTC</h1>
      <section>
        {tweets.tweetList.map((tweet, index) => {
          return (
          <div key={index} id={"ttcNotice" + index}>
            <TTCItem tweet={tweet}/> 
          </div>
          );
        })}
      </section>
    </div>
  )
  
}

export default TTC;