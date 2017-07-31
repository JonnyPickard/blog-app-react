const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const blogPostRoute = require('./routes/blog_post_route');

const port = process.env.PORT || 3000;

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/blogapp', (err) => { if (err) console.log(err); });

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', blogPostRoute);

const server = app.listen(port, () => {
  if (process.env.NODE_ENV === 'test') server.close();

  console.log('App listening on port', port);
});


module.exports = app;
