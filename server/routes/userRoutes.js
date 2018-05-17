var Postgress = require('../db/db');
var express = require('express');
var router = express.Router();

router.get('/logout', (req, res) => {
    res.redirect('/');
});

router.get('/', (req, res) => {
    const uid = req.uid;
    const query = {
        text: 'Select * FROM site_ops.user RIGHT JOIN site_ops.permissions ' +
        'on site_ops.user.role_id = site_ops.permissions.role_id where site_ops.user.user_id = $1',
        values: [uid],
    };

    Postgress.execQuery(function (error, results) {
        console.log(error);
        if (error) {
            res.status(404).send({message: 'Error getting user data'});
        } else {
            res.status(200).send(results.rows);
        }
    }, query);
});

router.post('/', (req, res) => {
    const uid = req.uid;
    const query = {
        text: 'INSERT INTO site_ops.user (user_id, first_name, last_name, title, role_id) VALUES ($1, $2, $3, $4, $5)',
        values: [uid, req.body.first_name, req.body.last_name, req.body.title, req.body.role_id],
    };
    Postgress.execQuery(function (error, results) {
        console.log(error);
        if (error) {
            res.status(404).send({message: 'Error adding user'});
        } else {
            res.status(200).send(results.rows);
        }
    }, query);
});

module.exports = router;
