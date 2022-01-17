const express = require('express');
const path = require('path');
require('dotenv').config();

// DB config
const { dbConn } = require('./database/config')
dbConn();

// Express App
const app = express();

// Node Server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require('./sockets/socket');

// Public Path
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

server.listen(process.env.PORT, (error) => {
  if (error) throw Error(error);
  console.log('Server running on port', process.env.PORT);
});