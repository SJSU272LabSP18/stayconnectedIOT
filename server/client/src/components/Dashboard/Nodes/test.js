import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

function subscribeToData(cb) {
  socket.on('data', object => cb(null, object));
  socket.emit('subscribeToData', 10000);

}


export { subscribeToData };
