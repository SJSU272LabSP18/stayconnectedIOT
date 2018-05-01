require('./globals');
var compression = require('compression');
const express = require('express');
const cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
const passport = require('passport');
const keys = require('./config/keys');
const app = express();
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

const SOCKET_PORT = process.env.PORT || 8000;
require('./db');
require('./services/passport');

//app.use(compression());
//app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [keys.cookieKey]
//   })
// );
//
// app.use(passport.initialize());
// app.use(passport.session());
require('./routes/locationRoutes')(app);
require('./routes/siteRoutes')(app);
require('./routes/zoneRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/nodeRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on express port`, PORT);
});
// server.listen(SOCKET_PORT, function() {
//   console.log('listening on socket port ', SOCKET_PORT);
// });
