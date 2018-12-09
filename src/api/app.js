const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
//const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const path = require('path');

const devEnv = require('../../development.config');

// Correct REST naming

const {  userRoutes, categoryRoutes  } = require('./routes');

const app = express();

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Load 'development' configs for dev environment
if (process.env.NODE_ENV !== 'production') {
  devEnv.init();
}

// Open MOngoose connection to db
require('../db');

// cors middleware for orign and Headers
app.use(cors());

// Set Bodyparser middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Use Morgan middleware for logging every request status on console
app.use(morgan('dev'));

// Set file upload middleware
//app.use(fileUpload());
//app.use('/uploads', express.static(process.env.FILE_UPLOAD_FOLDER));

// static folder
app.use(express.static(path.join(__dirname, '../../public/dist/shubham-singh-web'), {redirect: false}));

// Routes which should handle request
app.all('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../public/dist/shubham-singh-web/index.html'));
});

app.use('/api/users',  userRoutes, cors(corsOptions));
app.use('/api/categories', categoryRoutes, cors(corsOptions));

// Invalid routes handling middleware
app.use((req, res, next) => {
  const error = new Error('404 not found');
  next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
