import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import TTCItem from "./TTCItem";

function TTC(props) {
  const [tweets, setTweets] = useState({
    twitterUser: "@ttcnotices",
    twitterId: "19025957",
    tweetList: [],
  });

  // const railRoutes = [1,2,3,4,301,304,306,310,501,503,504,505,506,509,510,511,512]
  // bus routes not included in routes array: 7 to 189, 300 to 396 (blue night), 400-405 (community bus), 900 - 996 (express)

  const formatTweets = (tweetArr) => {
    const getRouteNumber = function (input) {
      const match = input.match(/\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9])\b/);
      if (match) {
        return Number(match[0]);
      }
      return "-";
    }
    const getRouteColor = function (num) {
      //NOTE: the className must appear entirety (e.g. 'bg-[#f8c300]') for tailwind to extract & compile it
      //TTC red colour info and tones: https://www.color-hex.com/color/da251d
      if (num === 1) return ['bg-[#f8c300]', "subway"]
      if (num === 2) return ['bg-[#00923f]', "subway"]
      if (num === 3) return ['bg-[#0082c9]', "subway"]
      if (num === 4) return ['bg-[#a21a68]', "subway"]
      if (num < 300) return ['bg-[#e56660]', "bus"]
      if (num < 400) return ['bg-[#024182]', "blue-night"]
      if (num < 500) return ['bg-[#808080]', "community-bus"]
      if (num < 900) return ['bg-[#da251d]', "streetcar"]
      if (num > 900) return ['bg-[#00923f]', "express"]
      return ['bg-[#d7dbd3]', 'non-route']
    }
    const formattedArr = [];
    tweetArr.forEach((tweet) => {
      const tweetText = tweet.text.slice(0, tweet.text.indexOf(" http")); //remove link url from tweet text
      // console.log(tweetText, "######", getRouteNumber(tweetText))
      const routeNumber = getRouteNumber(tweetText)
      const [routeColor, routeType] = getRouteColor(routeNumber)
      formattedArr.push({
        created_at: tweet.created_at,
        id: tweet.id,
        text: tweetText,
        routeNumber,
        routeType,
        routeColor
      });
    });
    return formattedArr;
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/ttcAlerts`)
      .then(res => {
        const formattedData = formatTweets(res.data.data)
        console.log(formattedData)
        setTweets({
          tweetList: formattedData
        });
      })
      .catch((err) => {
        console.log("twitter GET error:", err);
      });
  }, []);

  return (
    <div className="flex-col">
      <h1 className="text-accent text-center dark:text-white">
        TTC
        <span> @</span><a
          className="underline text-right text-xs"
          href="https://twitter.com/ttcnotices"
          target="_blank"
          rel="noopener noreferrer"
        >
          TTCnotices
        </a>
      </h1>
      <section className="divide-y bg-slate-400">
        {tweets.tweetList.map((tweet, index) => {
          return (
            <div key={index} id={"ttcNotice" + index}>
              <TTCItem tweet={tweet} />
            </div>
          );
        })}
      </section>

      {props.devView &&
        <section>
          <div>
            <h2 className="dark:text-white">
              Subway
            </h2>
            {tweets.tweetList.filter((tweet) => tweet.routeType === "subway").map((tweet, index) => {
              return (
                <div key={index} id={"subwayNotice" + index}>
                  <TTCItem tweet={tweet} />
                </div>
              )
            })}
          </div>
        </section>
      }
    </div>
  )
}

export default TTC;