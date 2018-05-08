var Postgress = require('../db/db');
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    const sql = 'Select * FROM site_ops.location';
    Postgress.execQuery(function (error, results) {
        if (error) {
            res.status(401).send({
                message: 'Error getting specific location for a given site'
            });
        } else {
            res.status(200).send(results.rows);
        }
    }, sql);
});

router.post('/:locationId', (req, res) => {
    const {location, zone} = req.body;
    const sql = 'INSERT * FROM tbl';

    if (!location) {
        console.log('location info not available', location);
    } else {
        console.log('location info not available', location);
    }
    Postgress.execQuery(function (error, results) {
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
    Postgress.execQuery(function (error, results) {
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

    Postgress.execQuery(function (error, results) {
        if (error) {
            res.status(401).send({message: 'Error getting All Nodes'});
        } else {
            res.status(200).send(results.rows);
        }
    }, sql);
});

module.exports = router;