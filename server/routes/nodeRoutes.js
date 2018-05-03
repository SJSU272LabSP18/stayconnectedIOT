var Postgress = require('../db/db');
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    const sql = 'Select * FROM site_ops.node';
    Postgress.fetchData(function (error, results) {
        if (error) {
            res.status(401).send({message: 'Error getting All Nodes'});
        } else {
            res.status(200).send(results.rows);
        }
    }, sql);
});
router.get('/:nodeId', (req, res) => {
    const siteId = req.params.nodeId;
    const sql =
        'Select * FROM site_ops.node where site_ops.node.node_id=' + siteId;
    Postgress.fetchData(function (error, results) {
        if (error) {
            res.status(401).send({message: 'Error getting All Nodes'});
        } else {
            res.status(200).send(results.rows);
        }
    }, sql);
});

router.get('/:nodeId/?startTime=:startTime&endTime=:endTime',
    (req, res) => {
        const siteId = req.params.nodeId;
        const sql = 'Select * FROM site_ops.node where site_ops.node.node_id=' + siteId;
        Postgress.fetchData(function (error, results) {
            if (error) {
                res.status(401).send({message: 'Error getting All Nodes'});
            } else {
                res.status(200).send(results.rows);
            }
        }, sql);
    }
);

module.exports = router;
