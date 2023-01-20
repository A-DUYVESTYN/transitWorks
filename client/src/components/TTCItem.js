import React from "react";
import ReactTimeAgo from "react-time-ago";

const TTCItem = (props) => {
  const {tweet} = props;

  return (
    <div className="md:max-w-lg">
      <article className="flex flex-row">
        <div className="text-gray-900">
          <div className={`flex flex-col justify-center items-center h-full w-14 ${tweet.routeColor}`}>
            <p className="text-2xl font-semibold">{tweet.routeNumber}</p>
          </div>
        </div>
        <div className="grow text-gray-700 dark:text-gray-900">
          <p className="m-1">{tweet.text}</p>
          <div className="mx-1 text-right text-xs">
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