const express = require('express');
const morganLogger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const RateLimit = require('express-rate-limit');

const log = require('./config/logger');
const blogPostRoute = require('./routes/blog_post_route');

const { NODE_ENV, PORT = 3000 } = process.env;

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost:27017/blogapp')
  .catch(err => log('error', err));

const app = express();

if (NODE_ENV === 'dev') app.use(morganLogger('dev'));

app.use(new RateLimit({
  windowMs: 900000,
  max: 100,
  delayMs: 0,
}));

app.use(bodyParser.json());

app.use('/', blogPostRoute);

app.listen(PORT, () => {
  log('info', `App listening on port: ${PORT}`);
});

module.exports = app;
