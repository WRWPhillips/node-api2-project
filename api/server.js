// npm imports
const express = require('express');
// router imports
const postsRouter = require('./posts/posts-router');
// initialize server
const server = express();
// use middleware
server.use(express.json());
server.use('/api/posts', postsRouter);
// exports
module.exports = server;