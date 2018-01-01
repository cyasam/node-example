const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router');
const cors = require('cors');
const config = require('./config');
const app = express();

// DB Setup
config.serverConnect();

// App Setup
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router.init(app);

// Server Setup
const port = process.env.PORT || 3080;
const server = http.createServer(app);
server.listen(port);
console.log('Server listenin on:' + port);
