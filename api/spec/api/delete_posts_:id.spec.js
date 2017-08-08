const { expect } = require('chai');
const request = require('supertest');

const api = require('../../');
const { createPost, getPostById } = require('../helpers');

describe('DELETE /api/posts/:id', () => {
  let postId;

  before(async () => {
    const { _id } = await createPost();
    postId = _id;
  });

  it('Successfully deletes a blog post by _id', async () => {
    // Delete post by id route
    const res = await request(api)
      .delete(`/api/posts/${postId}`);

    // Test post no longer exists
    const post = await getPostById(postId);

    expect(post).to.equal(null);
    expect(res.status).to.equal(200);
    expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
  });
});

describe('DELETE /api/posts/:id with a bad _id', () => {
  it('Does not delete a post & returns 404', async () => {
    const res = await request(api)
      .delete('/api/posts/a');

    expect(res.status).to.equal(404);
    expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
    expect(res.body.status).to.equal('404');
    expect(res.body.error).to.equal('Not Found');
  });
});
