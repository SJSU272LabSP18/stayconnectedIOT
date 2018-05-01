var authRoutes = require('./authRoutes');
var locationRoutes = require('./locationRoutes');
var siteRoutes = require('./siteRoutes');
var zoneRoutes = require('./zoneRoutes');
var nodeRoutes = require('./nodeRoutes');

module.exports = function routes(app) {
    app.use('/auth', authRoutes);
    app.use('/api/v1/locations', locationRoutes);
    app.use('/api/v1/sites', siteRoutes);
    app.use('/api/v1/zones', zoneRoutes);
    app.use('/api/v1/nodes', nodeRoutes);
};