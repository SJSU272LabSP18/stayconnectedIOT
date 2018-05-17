var userRoutes = require('./userRoutes');
var permissionRoutes = require("./permissionsRoutes");
var locationRoutes = require('./locationRoutes');
var siteRoutes = require('./siteRoutes');
var zoneRoutes = require('./zoneRoutes');
var nodeRoutes = require('./nodeRoutes');
var noaaRoutes = require('./noaaRoutes');

module.exports = function routes(app) {
    app.use('/api/users', userRoutes);
    app.use('/api/permissions', permissionRoutes);
    app.use('/api/locations', locationRoutes);
    app.use('/api/sites', siteRoutes);
    app.use('/api/zones', zoneRoutes);
    app.use('/api/nodes', nodeRoutes);
    app.use('/api/noaa', noaaRoutes);
};
