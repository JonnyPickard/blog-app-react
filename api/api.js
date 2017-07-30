const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const {
  getMany,
  getOneById,
  createOne,
  deleteOneById,
} = require('./blog-post-model');

const port = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/posts', async (req, res) => {
  const posts = await getMany();
  res.json(posts);
});

app.post('/api/posts', async (req, res) => {
  try {
    const post = await createOne(req.body);
    res.json(post);
  } catch (err) {
    console.log(err);
    res.send('The post could not be saved successfully');
  }
});

app.get('/api/posts/:id', (req, res) => {
  try {
    getOneById(req.body);
  } catch (err) {
    console.log(err);
    res.send('The post you have requested does not exist');
  }
});

app.delete('/api/posts/:id', (req, res) => {
  try {
    deleteOneById(req.body);
  } catch (err) {
    console.log(err);
    res.send('The post you have requested to delete does not exist');
  }
});

const server = app.listen(port, () => {
  if (process.env.NODE_ENV === 'test') server.close();

  console.log('App listening on port', port);
});


module.exports = app;
