const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const RateLimit = require('express-rate-limit');
const winston = require('winston');

const blogPostRoute = require('./routes/blog_post_route');

const { NODE_ENV, PORT = 3000 } = process.env;

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost:27017/blogapp')
  .catch(err => winston.log('error', err));

const app = express();

app.use(new RateLimit({
  windowMs: 900000,
  max: 100,
  delayMs: 0,
}));

if (NODE_ENV === 'dev') app.use(logger('dev'));
if (NODE_ENV === 'test') winston.remove(winston.transports.Console);

app.use(bodyParser.json());

app.use('/', blogPostRoute);

app.listen(PORT, () => {
  winston.log('info', `App listening on port: ${PORT}`);
});

module.exports = app;
