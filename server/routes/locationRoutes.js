var Postgress = require('../db/db');
var express = require('express');
var router = express.Router();
var $ = require('jquery');

var baseURL = 'https://www.ncdc.noaa.gov/cdo-web/api/v2';
var condition = '/data?datasetid=GHCND&datatypeid=TAVG&locationcategoryid=95051&startdate=2018-05-01&enddate=2018-05-01&units=metric';
var condition1 = 'data?datasetid=GHCND&stationid=GHCND:USW00013872&datatypeid=TOBS&startdate=2010-05-01&enddate=2010-05-01&units=metric';
var key = 'EhzyTdGyXfiqTVYCoPXfWmBxlFSGVLof';


router.get('/', (req, res) => {
    //setInterval(FetchRemoteData, 30000);

    const sql = 'Select * FROM site_ops.location';
    Postgress.fetchData(function (error, results) {
        if (error) {
            res.status(401).send({
                message: 'Error getting specific location for a given site'
            });
        } else {
            res.status(200).send(results.rows);
        }
    }, sql);
    FetchRemoteData();
});

router.post('/:locationId', (req, res) => {
    const {location, zone} = req.body;
    const sql = 'INSERT * FROM tbl';

    if (!location) {
        console.log('location info not available', location);
    } else {
        console.log('location info not available', location);
    }
    Postgress.fetchData(function (error, results) {
        if (error) {
            res.status(401).send({message: 'Error getting All Locations'});
        } else {
            res.status(200).send(results.rows);
        }
    }, sql);
});

router.get('/:locationId/zones', (req, res) => {
    const locationId = req.params.locationId;
    const sql =
        'SELECT * FROM site_ops.zone WHERE zone.location_id = ' + locationId;
    Postgress.fetchData(function (error, results) {
        if (error) {
            res.status(401).send({message: 'Error getting All Locations'});
        } else {
            res.status(200).send(results.rows);
        }
    }, sql);
});

router.get('/:locationId/conditions', (req, res) => {
    const locationId = req.params.locationId;
    const startTime = req.query.startTime;
    const endTime = req.query.endTime;

    console.log(req.body);

    const sql =
        'Select AVG(temp) as temp, AVG(humidity) as humidity, AVG(voltage) as voltage, AVG(current) as current, AVG(var) as var ' +
        'FROM site_ops.location as location ' +
        'LEFT JOIN site_ops.zone  as zone on zone.location_id = location.location_id ' +
        'LEFT JOIN site_ops.node as node on node.zone_id = zone.zone_id ' +
        'LEFT JOIN site_ops.condition as condition on condition.node_id = node.node_id ' +
        'WHERE location.location_id = ' +
        locationId +
        ' and  condition.read_time between ' +
        "'" +
        startTime +
        "'" +
        ' and ' +
        "'" +
        endTime +
        "'";

    Postgress.fetchData(function (error, results) {
        if (error) {
            res.status(401).send({message: 'Error getting All Nodes'});
        } else {
            res.status(200).send(results.rows);
        }
    }, sql);
});



function FetchRemoteData(){
  $.ajax({ url:baseURL+condition, headers:{ token:key },
    success: function(result){
      console.log("successfully get here");
      console.log(result);
      var output = result.results[0].value;
      console.log(output);
    }
  });
}
//var filter = '?locationcategoryid=ST&limit=52';
/*
var http = require('http');

function FetchRemoteData(){
var options = {
  host: baseURL+condition,
  path: '/',
  //This is the only line that is new. `headers` is an object with the headers to request
  headers: {token:key}
};

callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });

  response.on('error', function (e) {
    console.log(e.message);
  });

}

var req = http.request(options, callback);
req.end();

/*
 const request = require(‘request’);
request(‘https://api.locatemap.in/userId/detail?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
if (err) { return console.log(err); }
console.log(body.url);
console.log(body.explanation);
});
  $.ajax({ url:baseURL+condition, headers:{ token:key },
    success: function(result){
      console.log(result);
      var output = result.results[0].value;
      console.log(output);
    }
  });*/
//}



module.exports = router;
