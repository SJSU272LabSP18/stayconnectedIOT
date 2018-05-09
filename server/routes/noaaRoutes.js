var request = require('request');
var express = require('express');
var router = express.Router();
var token = 'EhzyTdGyXfiqTVYCoPXfWmBxlFSGVLof';


router.get('/', (req, res) => {
  var condition = '&datatypeid=TOBS&startdate=2000-01-01&units=metric';
  var config = {
    url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?datasetid=GHCND' + condition,
    headers: {
      'Token': 'EhzyTdGyXfiqTVYCoPXfWmBxlFSGVLof'
    }
  };
  request(config, function (error, response, body) {
    console.log(JSON.stringify(body));
    var result = JSON.parse(body);
    res.send(result.results);
  });
});

router.get('/:stationId', (req, res) => {
  var stationId = req.params.stationId;
  var date = req.query.date;
  var startDate = req.query.startdate;
  var endDate = req.query.enddate;
  console.log(startDate);
  if(startDate == null && date == null){
    var config = {
      url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/stations/' + stationId,
      headers: {
        'Token': token
      }
    };

  } else if(startDate == null && date != null){
    var condition = '&datatypeid=TOBS&startdate='+date+'&enddate='+date+'&units=metric';
    var station_cond = '&stationid=' + stationId;
    var config = {
      url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND' + station_cond + condition,
      headers: {
        'Token': token
      }
    };
  }else{
    var condition = '&datatypeid=TOBS&startdate='+startDate+'&enddate='+endDate+'&units=metric';
    var station_cond = '&stationid=' + stationId;
    var config = {
      url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND' + station_cond + condition,
      headers: {
        'Token': token
      }
    };
  }

  request(config, function (error, response, body) {
    console.log(JSON.stringify(body));
    var result = JSON.parse(body);
    var data;
    if(error) {
      res.status(401).send({message: 'Error getting data'});
    }else {
      if(Object.keys(result).length === 0 && result.constructor === Object){
        res.send({message: 'Station has no data on this date'});
      }else {
        res.status(200).send(body);
      }
    }
  });
});



module.exports = router;
