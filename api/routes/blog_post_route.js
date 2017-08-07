const route = require('express').Router();

const {
  getMany,
  getOneById,
  createOne,
  deleteOneById,
} = require('../models/blog-post');

route.get('/api/posts', async (_, res) => {
  try {
    // TODO: Validate JWT given header func that throws
    const posts = await getMany();
    return res.json(posts);
  } catch (err) {
    return res.send(400);
  }
});

route.post('/api/posts', async ({ body }, res) => {
  try {
    const post = await createOne(body);
    return res.json(post);
  } catch (err) {
    return res.sendStatus(400);
  }
});

route.get('/api/posts/:id', async ({ params }, res) => {
  try {
    const post = await getOneById(params.id);
    return res.json(post);
  } catch (err) {
    return res.status(404).json({
      error: 'Not Found',
      status: '404',
    });
  }
});

route.delete('/api/posts/:id', async ({ params }, res) => {
  try {
    console.log(params);
    const post = await deleteOneById(params.id);
    console.log(post);
    return res.json(post);
  } catch (err) {
    return res.status(404).json({
      error: 'Not Found',
      status: '404',
    });
  }
});

module.exports = route;
