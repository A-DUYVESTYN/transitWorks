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
      <article className="flex">
        <div className="flex flex-col justify-center items-center min-w-24 px-4 bg-[#68952d]">
          <p className="text-2xl font-semibold">{formatLines(alert.Lines)}</p>
        </div>
        <div>
          <div className="">
            <p className="font-semibold">{alert.SubCategory}</p>
          </div>
          <div className="">
            <p className="m-1">{alert.BodyEnglish}</p>
            <div className="text-right text-secondary text-xs">
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