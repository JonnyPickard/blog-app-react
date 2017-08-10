const express = require('express');
const morganLogger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const RateLimit = require('express-rate-limit');

const log = require('./config/logger');
const { blogPostRoute, healthCheckRoute } = require('./routes');

const {
  NODE_ENV,
  PORT = 3000,
  MONGODB_URI = 'mongodb://localhost:27017/blogapp',
} = process.env;

mongoose.Promise = Promise;
mongoose
  .connect(MONGODB_URI)
  .catch(err => log('error', err));

const app = express();

if (NODE_ENV === 'dev') app.use(morganLogger('dev'));

app.use(new RateLimit({
  windowMs: 900000,
  max: 100,
  delayMs: 0,
}));

app.use(bodyParser.json());

app.all('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.use('/api', blogPostRoute);
app.use('/private', healthCheckRoute);

app.listen(PORT, () => {
  log('info', `App listening on port: ${PORT}`);
});

module.exports = app;
