import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import TTCItem from "./TTCItem";

function TTC(props) {
  const { devView, userPref, getRouteColor } = props;
  const [loading, setLoading] = useState(true)
  const [tweets, setTweets] = useState({
    twitterUser: "@ttcnotices",
    twitterId: "19025957",
    tweetList: [],
  });

  // const railRoutes = [1,2,3,4,301,304,306,310,501,503,504,505,506,509,510,511,512]
  // bus routes not included in routes array: 7 to 189, 300 to 396 (blue night), 400-405 (community bus), 900 - 996 (express)

  const formatTweets = (tweetArr) => {
    const getRouteNumber = function (input) {
      //regex match 0-999 in word boundaries. Allow one lookahead A-Z char (e.g. bus# 36F)
      const match = input.match(/\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9])(?=[A-Z]|\b)/);  
      if (match) { return Number(match[0]) }
      return "-";
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
    setLoading(true)
    axios.get(`${process.env.REACT_APP_SERVER_URL}/ttcAlerts`)
      .then(res => {
        // console.log("TTC twitter res.data.data:", res.data.data)
        const formattedData = formatTweets(res.data.data)
        // console.log(formattedData)
        setTweets({
          tweetList: formattedData
        });
      })
      .catch((err) => {
        console.log("twitter GET error:", err);
      })
      .finally(() => setLoading(false))
      // eslint-disable-next-line 
  }, []);

  return (
    <div className="flex-col">
      <h1 className="p-0.5 mx-1 font-medium text-gray-700 dark:text-gray-200">
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
      {loading && <section> Loading Service Notices</section>}
      {!loading &&
        <div>
          <div>
            <h2 className="p-0.5 mx-2 font-medium text-gray-700 dark:text-gray-200">My Routes</h2>
            {!userPref.ttcRoutes?.length && <p className="p-0.5 font-small text-gray-700 dark:text-gray-200">No saved routes. Add routes in User Settings.</p>}
            <section className="divide-y bg-slate-400 dark:bg-slate-500">
              {tweets.tweetList.filter((tweet) => userPref.ttcRoutes.includes(tweet.routeNumber)).map((tweet, index) => {
                return (
                  <div key={index} id={"myRouteTtcNotice" + index}>
                    <TTCItem tweet={tweet} />
                  </div>
                );
              })}
            </section>
          </div>
          <div>
            <h2 className="p-0.5 mx-2 font-medium text-gray-700 dark:text-gray-200">
              All Service Notices
            </h2>
            <section className="divide-y bg-slate-400 dark:bg-slate-500">
              {tweets.tweetList.map((tweet, index) => {
                return (
                  <div key={index} id={"ttcNotice" + index}>
                    <TTCItem tweet={tweet} />
                  </div>
                );
              })}
            </section>
          </div>
        </div>
      }

      {devView &&
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