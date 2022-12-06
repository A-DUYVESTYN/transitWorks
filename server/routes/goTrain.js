const axios = require('axios');
const express = require('express');
const router = express.Router();

const getGoTrainAlerts = () => {
  // const dateTo = new Date().toLocaleDateString('en-CA').replaceAll("-","")
  // let dateFrom = new Date();
  // dateFrom.setDate(dateFrom.getDate()-5)
  // dateFrom = dateFrom.toLocaleDateString('en-CA')
  // console.log(dateTo)

  const options = {
    baseURL:"http://api.openmetrolinx.com/OpenDataAPI/",
    method: 'GET',
    url: `api/V1/ServiceUpdate/ServiceAlert/All?key=${process.env.GO_TRANSIT_API_KEY}`,
  };
  return axios(options)
  .then( (res) => {
    console.log("####### GO Transit API respose data: ",res.data);
    return res.data
  })
  .catch( (err) =>  {
    console.log(err);
  });
}

router.get('/', (req, res) => {
  getGoTrainAlerts()
  .then((data) => {
    res.json(data)
  })
})

module.exports = router;