const { expect } = require('chai');
const request = require('supertest');
const api = require('../../');

const { createPost, getPostById } = require('../helpers');

describe('DELETE /api/posts/:id', () => {
  const _id = 1;

  before(async () => {
    await createPost({ _id });
  });

  it('Successfully deletes a blog post by _id', async () => {
    const res = await request(api)
      .delete('/api/posts/1');

    const post = await getPostById(_id);

    expect(!post);
    expect(res.status).to.equal(200);
    expect(res.headers['content-type']).to.equal('text/plain; charset=utf-8');
  });
});

describe('DELETE /api/posts/:id with a bad _id', () => {
  it('Does not delete a post & returns 400', async () => {
    const res = await request(api)
      .delete('/api/posts/a');

    expect(res.status).to.equal(400);
  });
});
