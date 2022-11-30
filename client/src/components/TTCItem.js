import React from "react";
import ReactTimeAgo from "react-time-ago";

const TTCItem = (props) => {
  const {tweet} = props;

  return (
    <div className="w-full m-2 rounded-lg shadow-md border-black border-2 lg:max-w-lg">
      <article className="flex flex-row">
        <div>
          <div className={`flex flex-col justify-center h-full ${tweet.routeColor}`}>
            <p className="text-2xl font-semibold px-4">{tweet.routeNumber}</p>
          </div>
        </div>
        <div>
          <p className="m-1">{tweet.text}</p>
          <div className="text-right text-secondary text-xs">
            <ReactTimeAgo
              date={Date.parse(tweet.created_at)}
              locale="en-US"
            />
          </div>
        </div>
      </article>
    </div>
  )
}

export default TTCItem