var Postgress = require('../db/db');
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    const sql = 'Select * FROM site_ops.node';
    Postgress.execQuery(function (error, results) {
        if (error) {
            res.status(400).send({message: 'Error getting All Nodes'});
        } else {
            res.status(200).send(results.rows);
        }
    }, sql);
});

router.post('/', (req, res) => {
    let node_id = req.body.node_id.match(/\d+/);
    const query = {
        text: 'INSERT INTO site_ops.node(node_id, node_address, zone_id, node_name, status)'
        + ' VALUES ($1, $2, $3, $4, $5)',
        values: [node_id[0], req.body.node_address, req.body.zone_id, req.body.node_name, req.body.status],
    };

    Postgress.execQuery(function (error, results) {
        if (error) {
            res.status(400).send({message: 'Error adding Node'});
        } else {
            res.status(200).send(results.rows);
        }
    }, query);
});

router.get('/:nodeId', (req, res) => {
    const nodeId = req.params.nodeId;
    const sql = 'Select * FROM site_ops.node where site_ops.node.node_id=' + nodeId;
    console.log(sql);
    Postgress.execQuery(function (error, results) {
        if (error) {
            res.status(400).send({message: 'Error getting Node'});
        } else {
            res.status(200).send(results.rows);
        }
    }, sql);
});

router.get('/:nodeId/conditions?startTime=:startTime&endTime=:endTime',
    (req, res) => {
        const nodeId = req.params.nodeId;
        const startTime = req.params.startTime;
        const endTime = req.params.endTime;
        const sql = 'Select * FROM site_ops.node where site_ops.node.node_id=' + nodeId;
        Postgress.execQuery(function (error, results) {
            if (error) {
                res.status(400).send({message: 'Error getting Node data'});
            } else {
                res.status(200).send(results.rows);
            }
        }, sql);
    }
);


router.post('/:nodeId/conditions',
    (req, res) => {
        const nodeId = req.params.nodeId;
        const query = {
            text: 'INSERT INTO site_ops.condition(read_time, temp,  humidity, voltage, current, var, node_id)'
            + ' VALUES (NOW(), $1, $2, $3, $4, $5, $6)',
            values: [req.body.temperature, req.body.humidity, req.body.voltage, req.body.current, req.body.var, nodeId],
        };

        Postgress.execQuery(function (error, results) {
            if (error) {
                res.status(400).send({message: 'Error getting Node conditions'});
            } else {
                res.status(200).send(results.rows);
            }
        }, query);
    }
);

appEvents.on(appConfig.SensorEvents.NODE_EVENT, function(data) {
    const query = {
        text: 'INSERT INTO site_ops.condition(read_time, temp,  humidity, voltage, current, var, node_id)'
        + ' VALUES (NOW(), $1, $2, $3, $4, $5, $6)',
        values: [data.temperature, data.humidity, data.voltage, data.current, data.var, data.node_id],
    };

    Postgress.execQuery(function (error, results) {
        if (error) {
            console.log(error.message);
        } else {
            console.log(JSON.stringify(results));
        }
    }, query);
});

module.exports = router;
