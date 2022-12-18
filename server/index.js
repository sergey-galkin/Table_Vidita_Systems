process.env.NODE_ENV = 'development';

const http = require('http');
const express = require('express');
const router = require('./src/router');

const app = express();
const server = http.createServer(app);

server.listen('3001');
console.log('Server is running on port 3001');
router(app);
