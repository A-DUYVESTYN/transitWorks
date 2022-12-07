import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import GoTransitServiceItem from "./GoTransitServiceItem";

function GoTransit(props) {
  const [alerts, setAlerts] = useState({
    alertList: [],
  });

  const formatAlerts = (alertsArr) => {
    const formattedArr = [...alertsArr].sort((a,b) => {
      const aDate = new Date(a.PostedDateTime)
      const bDate = new Date(b.PostedDateTime)
      return (bDate - aDate)
    });
    return formattedArr
  }
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/goTransit`)
      .then(res => {
        const formattedData = formatAlerts(res.data)
        console.log(formattedData)
        setAlerts({
          alertList: formattedData
        });
      })
      .catch((err) => {
        console.log("twitter GET error:", err);
      });
  }, []);

  return (
    <div className="flex-col">
      <h1 className="text-accent text-center">
        GO TRANSIT
      </h1>
      <section className="divide-y bg-slate-400">
        {alerts.alertList.map((alert, index) => {
          return (
            <div key={index} id={"goAlert" + index}>
              <GoTransitServiceItem alert={alert} />
            </div>
          );
        })}
      </section>
    </div>

  )
}

export default GoTransit;