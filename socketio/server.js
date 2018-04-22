const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT || 8000;

var location_data = {
  "L1": [{
  	"Z1":{
      "area": 'Zone',
      'name': 'Z_1',
  		"nodes": 4,
  		"active": 4,
  		"inactive": 0,
  		"temp": 27,
  		"power_usage": 12,
  		"timestamp": 123
  	},
  	"Z2":{
      "area": 'Zone',
      'name': 'Z_2',
  		"nodes": 1,
  		"active": 1,
  		"inactive": 0,
  		"temp": 28,
  		"power_usage": 14,
  		"timestamp": 123},
  "Z3":{
        "area": 'Zone',
        'name': 'Z_3',
    		"nodes": 1,
    		"active": 1,
    		"inactive": 0,
    		"temp": 30,
    		"power_usage": 16,
    		"timestamp": 123
    	}

    }
  ]
}

io.on('connection', function(socket) {
  console.log('A sensor connected');

  //send new temperature
  socket.emit('location_data', location_data);

  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
});

server.listen(PORT, function() {
  console.log('listening on port ', PORT);
});
