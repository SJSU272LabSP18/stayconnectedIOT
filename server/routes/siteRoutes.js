var Postgress = require('../db/db');
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    console.log('Here to get the sites');
    const sql = 'Select * FROM site_ops.site';
    Postgress.fetchData(function (error, results) {
        if (error) {
            res.status(401).send({message: 'Error getting All sites'});
        } else {
            res.status(200).send(results.rows);
        }
    }, sql);
});

router.get('/:siteId', (req, res) => {
    const siteId = req.params.siteId;
    console.log(siteId);
    const sql =
        'Select * FROM site_ops.site where site_ops.site.site_id=' + siteId;

    Postgress.fetchData(function (error, results) {
        if (error) {
            console.log(error);
            res.status(401).send({message: 'Error getting specified site'});
        } else {
            res.status(200).send(results.rows);
        }
    }, sql);
});
router.get('/:siteId/locations/:locationId', (req, res) => {
    const siteId = req.params.siteId;
    const locationId = req.params.locationId;
    const sql =
        'Select * FROM site_ops.location where site_ops.location.location_id =' +
        locationId +
        ' and site_ops.location.site_id=' +
        siteId;

    Postgress.fetchData(function (error, results) {
        if (error) {
            res.status(401).send({
                message: 'Error getting specific location for a given site'
            });
        } else {
            res.status(200).send(results.rows);
        }
    }, sql);
});

router.get('/:siteId/locations', (req, res) => {
    const siteId = req.params.siteId;
    const sql =
        'Select * FROM site_ops.location where site_ops.location.site_id=' +
        siteId;
    Postgress.fetchData(function (error, results) {
        if (error) {
            res
                .status(401)
                .send({message: 'Error getting All Locations for given site'});
        } else {
            res.status(200).send(results.rows);
        }
    }, sql);
});

module.exports = router;