require('../globals');
var express = require('express');
var router = express.Router();

var io;

var Socket = (module.exports = function(app) {
  app.use(router);
});

Socket.prototype.setSocketIO = function (_io) {
  io = _io;

  io.on(appConfig.SocketEvents.CONNECTION, function (socket) {
    console.log('client connected');
    socket.emit(appConfig.SocketEvents.CONNECTION, {connected: true});

    socket.on(appConfig.SensorEvents.NODE_EVENT, function (data) {
      appEvents.emit(appConfig.SensorEvents.NODE_EVENT, data);
    });

    socket.on(appConfig.SensorEvents.ZONE_EVENT, function (data) {
      appEvents.emit(appConfig.SensorEvents.ZONE_EVENT, data);
    });

    socket.on(appConfig.SensorEvents.LOCATION_EVENT, function (data) {
      appEvents.emit(appConfig.SensorEvents.LOCATION_EVENT, data);
    });

    socket.on(appConfig.SocketEvents.DISCONNECTED, function (socket) {
      console.log('client disconnected');
      appEvents.emit(appConfig.SocketEvents.DISCONNECTED, {connected: false});
    });
  });
};

appEvents.on(appConfig.AppEvents.NODE_UPDATE, function(data) {
  io.emit(data.node_id, data);
});
