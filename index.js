

//import express from 'express';

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB setup
mongoose.connect('mongodb://localhost:auth/auth')
// where the last 'auth' is our name for the db

//App set-up--
app.use(morgan('combined'));
//logging framework-middlewares

app.use(bodyParser.json({type: '*/*'}))
// incoming parsed as json no matter what type-middlewares

router(app);



//Server set-up
const port = process.env.PORT || 3090;
const server = http.createServer(app);
// http is node library for dealing w incoming requests



server.listen(port);
console.log('Server listening on:', port);