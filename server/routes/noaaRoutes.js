var express = require('express');
var router = express.Router();
var $ = require('jquery');

var baseURL = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/';
var condition = 'data?datasetid=GHCND&datatypeid=TAVG&locationcategoryid=95051&startdate=2018-05-01&enddate=2018-05-01&units=metric';

var condition1 = 'data?datasetid=GHCND&stationid=GHCND:USW00013872&datatypeid=TOBS&startdate=2010-05-01&enddate=2010-05-01&units=metric';
var key = 'EhzyTdGyXfiqTVYCoPXfWmBxlFSGVLof';
//var filter = '?locationcategoryid=ST&limit=52';

function FetchRemoteData(){
  $.ajax({ url:baseURL+condition, headers:{ token:key },
    success: function(result){
      console.log(result);
      var output = result.results[0].value;
      console.log(output);
    }
  });
}

//setInterval(FetchRemoteData, 30000);
router.get('/', (req, res) => {
  console.log('connected to server');
  FetchRemoteData();
  });


module.exports = router;
