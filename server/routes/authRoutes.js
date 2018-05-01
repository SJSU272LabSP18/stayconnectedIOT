const passport = require('passport');
var express = require('express');
var router = express.Router();

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
router.get('/session', (req, res) => {
    //res.send(req.session);
    res.send(req.user);
});

module.exports = router;
