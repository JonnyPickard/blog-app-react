const route = require('express').Router();
const { log } = require('winston');

const {
  getMany,
  getOneById,
  createOne,
  deleteOneById,
} = require('../models/blog-post');

route.get('/posts', async (_, res) => {
  try {
    const posts = await getMany();
    return res.json(posts);
  } catch (err) {
    log('warn', err);
    return res.send(400);
  }
});

route.post('/posts', async ({ body }, res) => {
  try {
    const post = await createOne(body);
    return res.json(post);
  } catch (err) {
    log('warn', err);
    return res.sendStatus(400);
  }
});

route.get('/posts/:id', async ({ params }, res) => {
  try {
    const post = await getOneById(params.id);
    return res.json(post);
  } catch (err) {
    log('warn', err);
    return res.status(404).json({
      error: 'Not Found',
      status: '404',
    });
  }
});

route.delete('/posts/:id', async ({ params }, res) => {
  try {
    const post = await deleteOneById(params.id);
    return res.json(post);
  } catch (err) {
    log('warn', err);
    return res.status(404).json({
      error: 'Not Found',
      status: '404',
    });
  }
});

module.exports = route;
