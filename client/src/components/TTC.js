import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import TTCItem from "./TTCItem";
import TTCpref from "./TTCpref";

function TTC(props) {
  const [tweets, setTweets] = useState({
    twitterUser: "@ttcnotices",
    twitterId: "19025957",
    tweetList: [],
  });

  const [view, setView] = useState("app")  // switch between app or preferences

  const [ttcPref, setTtcPref] = useState({
    routes: [1, 2, 80, 76, 15],  // temp default set to [1,2,80,76,15]
    stations: [], // Royal York, St george
  })


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
      <h1 className="p-0.5 mx-2 font-medium text-gray-700 dark:text-gray-200">
        TTC
        <span> @</span><a
          className="underline text-right text-xs"
          href="https://twitter.com/ttcnotices"
          target="_blank"
          rel="noopener noreferrer"
        >
          TTCnotices
        </a>
        <span class="text-center">
          <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-backdrop" data-drawer-show="drawer-backdrop" data-drawer-backdrop="true" aria-controls="drawer-backdrop">
            settings
          </button>
        </span>
      </h1>
      <section className="divide-y bg-slate-400 dark:bg-slate-500">
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
            <h2 className="p-0.5 mx-2 font-medium text-gray-700 dark:text-gray-200">
              Subway
            </h2>
            <section className="divide-y bg-slate-400 dark:bg-slate-500">
              {tweets.tweetList.filter((tweet) => tweet.routeType === "subway").map((tweet, index) => {
                return (
                  <div key={index} id={"subwayNotice" + index}>
                    <TTCItem tweet={tweet} />
                  </div>
                )
              })}
            </section>
          </div>
        </section>
      }
      
    </div>
  )
}

export default TTC;