import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
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
      if (num === 1) return '[#f8c300]'
      if (num === 2) return '[#00923f]'
      if (num === 3) return '[#0082c9]'
      if (num === 4) return '[#a21a68]'
      if (num < 300) return '[#da251d]'
      if (num < 400) return '[#024182]'
      if (num < 500) return '[#808080]'
      if (num < 900) return '[#da251d]'
      if (num > 900) return '[#00923f]'
    }
    const formattedArr = [];
    tweetArr.forEach((element) => {
      const tweetText = element.text.slice(0, element.text.indexOf(" http")); // remove the link url from end of tweet text
      const routeNumber = 504
      const routeType = "Line 2"
      const routeColor = `bg-${getRouteColor(routeNumber)}`
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
          <div className="w-full m-2 rounded-lg shadow-md border-black border-2 lg:max-w-lg">
            <article className="flex flex-row items-start m-1">
              <div className={`text-2xl font-semibold self-center px-4 py-2 ${tweet.routeColor}`}>
                {tweet.routeNumber}
              </div>
              <div key={index} id={"tweet" + index}>
                <p>{tweet.text}</p>
              </div>
            </article>
          </div>
          );
        })}
      </section>
    </div>
  )
  
}

export default TTC;