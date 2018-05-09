var request = require('request');
var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
  var condition = '&datatypeid=TOBS&startdate=2010-05-01&enddate=2010-05-01&units=metric';
  var config = {
    url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?datasetid=GHCND' + condition,
    headers: {
      'Token': 'EhzyTdGyXfiqTVYCoPXfWmBxlFSGVLof'
    }
  };
  request(config, function (error, response, body) {
    //var result = body.results[0].value;
    console.log(JSON.stringify(body));
    var result = JSON.parse(body);
    res.send(result.results);
  });
});

router.get('/:stationId', (req, res) => {
  var stationId = req.params.stationId;
  var condition = '&datatypeid=TOBS&startdate=2010-05-01&enddate=2010-05-01&units=metric';
  var station_cond = '&stationid=' + stationId;
  var config = {
    url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND' + station_cond + condition,
    headers: {
      'Token': 'EhzyTdGyXfiqTVYCoPXfWmBxlFSGVLof'
    }
  };
  request(config, function (error, response, body) {
    //var result = body.results[0].value;
    console.log(JSON.stringify(body));
    var result = JSON.parse(body);
    var data;
    if(Object.keys(result).length === 0 && result.constructor === Object){
      res.status(401).send({message: 'Error: Station has no data'});
    }else {
      data = result.results[0];
      res.status(200).send(data);
    }

  });
});


module.exports = router;
