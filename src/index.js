const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const EventEmitter = require('events');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const dotenv = require('dotenv');
const cors = require('cors');
const _ = require('lodash');
const helmet = require('helmet');
// routes
const allRoutes = require('./routes/allRoutes');
// mySettings
const keys = require('./config/keys');
// bluebird
mongoose.Promise = Promise;
// server settings
dotenv.config();
const app = express();
const server = http.createServer(app);
const emitter = new EventEmitter();
emitter.setMaxListeners(20);
const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
// set middleware
app.use(cors(corsOption));
app.use(helmet());
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// routing
app.use('/api', allRoutes);
// prod and dev mode
if (process.env.NODE_ENV == 'production') {
  mongoose.connect(keys.mongoDB.Prod, { useNewUrlParser: true }, () => console.log('Mongo started prod-mode'));
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  });
} else if (process.env.NODE_ENV == 'development') {
  mongoose.connect(keys.mongoDB.Prod, { useNewUrlParser: true }, () => console.log('Mongo started dev-mode'));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
  });
}
// server port and start
server.listen();