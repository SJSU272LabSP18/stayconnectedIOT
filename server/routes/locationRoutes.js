var Postgress = require('../db');

module.exports = app => {
  app.get('/api/locations', (req, res) => {
    const sql = 'Select * FROM site_ops.location';
    Postgress.fetchData(function(error, results) {
      if (error) {
        res.status(401).send({
          message: 'Error getting specific location for a given site'
        });
        return;
      } else {
        res.status(200).send(results);
      }
    }, sql);
  });
  app.post('/sites/:siteId/locations/:locationId', (req, res) => {
    const { location, zone } = req.body;
    const sql = 'INSERT * FROM tbl';

    if (!location) {
      console.log('location info not available', location);
    } else {
      console.log('location info not available', location);
    }
    Postgress.fetchData(function(error, results) {
      if (error) {
        res.status(401).send({ message: 'Error getting All Locations' });
        return;
      } else {
        res.status(200).send(results);
      }
    }, sql);
  });

  app.get('/api/locations/:locationId/zones', (req, res) => {
    const locationId = req.params.locationId;
    const sql =
      'SELECT * FROM site_ops.zone WHERE zone.location_id = ' + locationId;
    Postgress.fetchData(function(error, results) {
      if (error) {
        res.status(401).send({ message: 'Error getting All Locations' });
        return;
      } else {
        res.status(200).send(results);
      }
    }, sql);
  });
  app.get('/conditions/locations/:locationId', (req, res) => {
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

    Postgress.fetchData(function(error, results) {
      if (error) {
        res.status(401).send({ message: 'Error getting All Nodes' });
        return;
      } else {
        res.status(200).send(results);
      }
    }, sql);
  });
};
//  '/conditions/:locationId/?startTime=:startTime&endTime=:endTime',
