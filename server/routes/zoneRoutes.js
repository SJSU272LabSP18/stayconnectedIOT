var Postgress = require('../db');

module.exports = app => {
  app.get('/api/zones', (req, res) => {
    const sql = 'Select * FROM site_ops.zone';
    Postgress.fetchData(function(error, results) {
      if (error) {
        res.status(401).send({ message: 'Error getting All zone' });
        return;
      } else {
        res.status(200).send(results);
      }
    }, sql);
  });

  app.get('/api/zones/:zoneId', (req, res) => {
    const zoneId = req.params.zoneId;
    const sql =
      'Select * FROM site_ops.zone where site_ops.zone.zone_id=' + zoneId;
    Postgress.fetchData(function(error, results) {
      if (error) {
        res.status(401).send({ message: 'Error getting All zone' });
        return;
      } else {
        res.status(200).send(results);
      }
    }, sql);
  });

  app.get('/api/zones/:zoneId/nodes', (req, res) => {
    const zoneId = req.params.zoneId;
    const sql =
      ' SELECT * FROM site_ops.node where site_ops.node.zone_id =' + zoneId;
    Postgress.fetchData(function(error, results) {
      if (error) {
        res
          .status(401)
          .send({ message: 'Error getting All nodes for given zone' });
        return;
      } else {
        res.status(200).send(results);
      }
    }, sql);
  });

  app.get('/conditions/zones/:zoneId', (req, res) => {
    const zoneId = req.params.zoneId;
    const startTime = req.query.startTime;
    const endTime = req.query.endTime;
    console.log(endTime);

    const sql =
      'Select AVG(temp) as temp, AVG(humidity) as humidity, AVG(voltage) as voltage, AVG(current) as current, AVG(var) as var' +
      ' FROM site_ops.zone as zone ' +
      ' LEFT JOIN site_ops.node as node on node.zone_id = zone.zone_id' +
      ' LEFT JOIN site_ops.condition as condition on condition.node_id = node.node_id ' +
      ' WHERE zone.zone_id= ' +
      zoneId +
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
