var appConfig = {};

appConfig.SensorEvents = {
    LOCATION_EVENT: 'location_data',
    NODE_EVENT: 'sensor_data',
    ZONE_EVENT: 'zone_data'
};

appConfig.AppEvents = {
    NODE_UPDATE: 'node_update'
};

appConfig.SocketEvents = {
    CONNECTION: 'connection',
    DISCONNECTED: 'disconnect'
};

appConfig.Firebase = {
    DATABASE_URL: 'https://stayconnected-538a4.firebaseio.com',
};
module.exports = appConfig;
