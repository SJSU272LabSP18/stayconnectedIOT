var authRoutes = require('./authRoutes');
var locationRoutes = require('./locationRoutes');
var siteRoutes = require('./siteRoutes');
var zoneRoutes = require('./zoneRoutes');
var nodeRoutes = require('./nodeRoutes');

module.exports = function routes(app) {
    app.use('/api/users', authRoutes);
    app.use('/api/locations', locationRoutes);
    app.use('/api/sites', siteRoutes);
    app.use('/api/zones', zoneRoutes);
    app.use('/api/nodes', nodeRoutes);
};