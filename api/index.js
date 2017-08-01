const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const blogPostRoute = require('./routes/blog_post_route');

const { NODE_ENV, PORT = 3000 } = process.env;

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/blogapp').catch(err => console.log(err));

const app = express();

if (NODE_ENV === 'dev') app.use(logger('dev'));

app.use(bodyParser.json());

app.use('/', blogPostRoute);

app.listen(PORT, () => {
  console.log('App listening on port:', PORT);
});

module.exports = app;
