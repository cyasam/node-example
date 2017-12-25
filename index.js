const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router');
const cors = require('cors');
const app = express();

// DB Setup
mongoose.connect('mongodb://18.195.181.182/node-example', {
    useMongoClient: true
});

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
