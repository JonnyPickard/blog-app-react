const { expect } = require('chai');
const request = require('supertest');
const api = require('../../');

const { cleanDatabase, createPost } = require('../helpers');

describe('GET /api/posts/:id', () => {
  before(async () => {
    await createPost();
  });

  after(async () => {
    await cleanDatabase();
  });

  it('Successfully retrieves a blog post by _id', async () => {
    const res = await request(api)
      .get('/api/posts/1');

    expect(res.status).to.equal(200);
    expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
    expect(res.body._id).to.equal(1);
    expect(res.body.title).to.equal('1');
  });
});
