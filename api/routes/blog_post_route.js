const route = require('express').Router();

const {
  getMany,
  getOneById,
  createOne,
  deleteOneById,
} = require('../models/blog-post');

route.get('/api/posts', async (req, res) => {
  try {
    const posts = await getMany();
    return res.json(posts);
  } catch (err) {
    return res.send(400);
  }
});

route.post('/api/posts', async (req, res) => {
  try {
    await createOne(req.body);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(400);
  }
});

route.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await getOneById(req.params.id);
    return res.json(post);
  } catch (err) {
    return res.status(400).send('The post you have requested does not exist');
  }
});

route.delete('/api/posts/:id', async (req, res) => {
  try {
    await deleteOneById(req.params.id);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(400);
  }
});

module.exports = route;
