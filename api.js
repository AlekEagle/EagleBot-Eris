'use strict';

// Import dependencies
const express = require('express');
const app = express();

module.exports = (bot, logger) => {
  app.get('/', (req, res) => res.send('Hello World!')); // Hello World Test

  app.listen(8080, () => console.log(`Listening on port 8080`)); // Listen
};