var Postgress = require('../db/db');
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    const sql = 'SELECT * from site_ops.permissions';
    Postgress.execQuery(function (error, results) {
        if (error) {
            res.status(404).send({message: 'Error getting permissions'});
        } else {
            res.status(200).send(results.rows);
        }
    }, sql);
});

router.post('/', (req, res) => {
    const roleId = req.body.role_id;
    const permissionJson = req.body.permissions;
    const roleName = req.body.role_name;
    const query = {
        text: 'INSERT INTO site_ops.permissions (role_id, permissions, role_name) VALUES ($1, $2, $3)',
        values: [roleId, JSON.stringify(permissionJson), roleName],
    };

    Postgress.execQuery(function (error, results) {
        console.log(error);
        if (error) {
            res.status(404).send({message: 'Error adding permissions'});
        } else {
            res.status(200).send(results.rows);
        }
    }, query);
});

router.post('/:roleId', (req, res) => {
    const roleId = req.params.roleId;
    const permissionJson = req.body.permissions;
    const query = {
        text: 'UPDATE site_ops.permissions SET'
        + ' site_ops.permissions.permissions = site_ops.permissions.permissions ||'
        + ' $1 where site_ops.permissions.role_id = $2',
        values: [permissionJson, roleId],
    };

    Postgress.execQuery(function (error, results) {
        if (error) {
            res.status(401).send({message: 'Error updating permissions'});
        } else {
            res.status(200).send(results.rows);
        }
    }, query);
});

module.exports = router;
