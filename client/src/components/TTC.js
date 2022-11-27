import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";

function TTC(props) {

  const [tweets, setTweets] = useState({
    twitterUser: "@ttcnotices",
    twitterId: "19025957",
    tweetList: [],
  });
  const routes = [1,2,3,4,301,304,306,310,501,503,504,505,506,509,510,511,512]
// bus routes: 7 to 189, 300 to 396 (blue night), 400-405 (community bus), 900 - 996 (express)

  const formatTweets = (tweetArr) => {
    // remove the link url from end of tweet text
    
    const formattedArr = [];
    tweetArr.forEach((element) => {
      const tweetText = element.text.slice(0, element.text.indexOf(" http"));
      // if (tweetText.length > maxLength) tweetText = tweetText.substring(0, maxLength) + "..." // cap tweet length to 125 char
      const routeNumber = 2
      const routeType = "Line 1"

      formattedArr.push({
        created_at: element.created_at,
        id: element.id,
        text: tweetText,
        routeNumber,
        routeType,
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
        {tweets.tweetList.map((item, index) => {
          return (
          <div className="w-full m-2 p-1 rounded-lg shadow-md border-black border-2 lg:max-w-lg">
            <article className="space-y-2">
              <h3 className="text-2xl font-semibold">
                  Title
              </h3>
              <div key={index} id={"tweet" + index}>
                <p>{item.text}</p>
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