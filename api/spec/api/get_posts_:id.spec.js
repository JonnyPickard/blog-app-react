const { expect } = require('chai');
const request = require('supertest');

const api = require('../../');
const { cleanDatabase, createPost } = require('../helpers');

describe('GET /api/posts/:id', () => {
  let postId;

  before(async () => {
    const { _id } = await createPost();
    postId = _id;
  });

  after(async () => {
    await cleanDatabase();
  });

  it('Successfully retrieves a blog post by _id', async () => {
    const res = await request(api)
      .get(`/api/posts/${postId}`);

    expect(res.status).to.equal(200);
    expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
    expect(res.body._id).to.equal(postId.toString());
    expect(res.body.title).to.equal('1');
  });
});

describe('GET /api/posts/:id non existent post', () => {
  it('Does not retrieve a blog post & returns a 404', async () => {
    const res = await request(api)
      .get('/api/posts/fake_post');

    expect(res.status).to.equal(404);
    expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
    expect(res.body.status).to.equal('404');
    expect(res.body.error).to.equal('Not Found');
  });
});
