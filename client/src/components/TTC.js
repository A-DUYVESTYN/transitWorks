import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";

function TTC(props) {

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
    <div className="flex-col">
      <h1>TTC</h1>
      <section>
        {tweets.tweetList.map((item, index) => {
          return (
          <div className="w-full p-4 shadow-md lg:max-w-lg">
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