import React from "react";
import ReactTimeAgo from "react-time-ago";

const GoTransitServiceItem = (props) => {
  const { alert } = props;

  return (
    <div className="md:max-w-lg ">
      <article className="flex flex-row">
        <div className="justify-center items-center h-full w-32 bg-[#68952d]">
          <p className="text-2xl font-semibold">{alert.Lines.map(element => element.Code)}</p>
        </div>
        <div>
          <div className="flex flex-col">
            <p className="font-semibold">{alert.SubCategory}</p>
          </div>
          <div className="grow">
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