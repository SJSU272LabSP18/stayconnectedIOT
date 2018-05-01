var Postgress = require('../db');

module.exports = app => {
  app.get('/api/nodes', (req, res) => {
    const sql = 'Select * FROM site_ops.node';
    Postgress.fetchData(function(error, results) {
      if (error) {
        res.status(401).send({ message: 'Error getting All Nodes' });
        return;
      } else {
        res.status(200).send(results);
      }
    }, sql);
  });
  app.get('/api/nodes/:nodeId', (req, res) => {
    const siteId = req.params.nodeId;
    const sql =
      'Select * FROM site_ops.node where site_ops.node.node_id=' + siteId;
    Postgress.fetchData(function(error, results) {
      if (error) {
        res.status(401).send({ message: 'Error getting All Nodes' });
        return;
      } else {
        res.status(200).send(results);
      }
    }, sql);
  });

  app.get(
    '/conditions/:nodeId/?startTime=:startTime&endTime=:endTime',
    (req, res) => {
      const siteId = req.params.nodeId;
      const sql =
        'Select * FROM site_ops.node where site_ops.node.node_id=' + siteId;
      Postgress.fetchData(function(error, results) {
        if (error) {
          res.status(401).send({ message: 'Error getting All Nodes' });
          return;
        } else {
          res.status(200).send(results);
        }
      }, sql);
    }
  );
};
