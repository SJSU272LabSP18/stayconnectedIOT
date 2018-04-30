require('./globals');
var express = require('express');
var router = express.Router();

var io;

var Socket = (module.exports = function(app) {
  app.use(router);
});
Socket.prototype.setSocketIO = function(_io) {
  io = _io;

  io.on('connection', function(socket) {
    console.log('client connected');
    socket.emit('connected', { connected: true });
  });

  io.on('disconnect', function(socket) {
    console.log('client disconnected');
    socket.emit('disconnected', { connected: false });
  });
};

appEvents.on(appConfig.EVENTS.REDEEM_UPDATES, function(data) {
  io.emit(appConfig.EVENTS.REDEEM_UPDATES, data);
});
