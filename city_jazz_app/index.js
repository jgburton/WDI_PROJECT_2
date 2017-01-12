// Where everything starts... can also be called server.js

// Require dependancies
const express  = require('express');
const app      = require();
const mongoose = require('mongoose');
const cors     = require('cors');
const routes   = require('./config/routes');
const port     = require(process.env.PORT || 3000);

// The mongodb connection
const databaseURL = process.env.MONGOLAB_URL || 'mongodb://localhost:27017/city_jazz_app';

// Use these apps
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use('/', routes);

// When listening console log to check connection
app.listen(port, console.log('Index has started on port: ${port}'));
