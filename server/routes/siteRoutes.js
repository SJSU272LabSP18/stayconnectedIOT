var Postgress = require('../db');

module.exports = app => {
  app.get('/api/sites', (req, res) => {
    console.log('Here to get the sites');
    const sql = 'Select * FROM site_ops.site';
    Postgress.fetchData(function(error, results) {
      if (error) {
        res.status(401).send({ message: 'Error getting All sites' });
        return;
      } else {
        res.status(200).send(results);
      }
    }, sql);
  });

  app.get('/api/sites/:siteId', (req, res) => {
    const siteId = req.params.siteId;
    console.log(siteId);
    const sql =
      'Select * FROM site_ops.site where site_ops.site.site_id=' + siteId;

    Postgress.fetchData(function(error, results) {
      if (error) {
        console.log(error);
        res.status(401).send({ message: 'Error getting specified site' });
        return;
      } else {
        res.status(200).send(results);
      }
    }, sql);
  });
  app.get('/api/sites/:siteId/locations/:locationId', (req, res) => {
    const siteId = req.params.siteId;
    const locationId = req.params.locationId;
    const sql =
      'Select * FROM site_ops.location where site_ops.location.location_id =' +
      locationId +
      ' and site_ops.location.site_id=' +
      siteId;

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

  app.get('/api/sites/:siteId/locations', (req, res) => {
    const siteId = req.params.siteId;
    const sql =
      'Select * FROM site_ops.location where site_ops.location.site_id=' +
      siteId;
    Postgress.fetchData(function(error, results) {
      if (error) {
        res
          .status(401)
          .send({ message: 'Error getting All Locations for given site' });
        return;
      } else {
        res.status(200).send(results);
      }
    }, sql);
  });
};
