import io from "socket.io-client";
const  socket = io('http://localhost:8000');
var connected = false;

socket.on('connect', function() {
  connected = true;
});

function subscribeToData(nodeId, callback) {
  socket.on(nodeId, data => {
    console.log('received data', JSON.stringify(data));
    callback(null, data);
  });
}

export { subscribeToData };
