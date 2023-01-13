import React from "react";
import ReactTimeAgo from "react-time-ago";

const GoTransitServiceItem = (props) => {
  const { alert } = props;

  const formatLines = (rawRouteNums) => {
    const routeNumbersArr = rawRouteNums.map(route => route.Code)
    return routeNumbersArr.join(", ")
  }

  return (
    <div className="md:max-w-lg ">
      <article className="flex flex-row">
        <div className="flex-none w-14 text-gray-900 bg-[#68952d]">
          <p className="flex items-center justify-center h-full text-2xl font-semibold">{formatLines(alert.Lines)}</p>
        </div>
        <div className="text-gray-700 dark:text-gray-900">
          <div className="">
            <p className="font-semibold">{alert.SubCategory}</p>
          </div>
          <div>
            <p className="m-1">{alert.BodyEnglish}</p>
            <div className="text-right mx-1 text-xs">
              <ReactTimeAgo
                date={Date.parse(alert.PostedDateTime)}
                locale="en-US"
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default GoTransitServiceItem