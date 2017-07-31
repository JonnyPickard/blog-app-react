const { expect } = require('chai');
const request = require('supertest');
const api = require('../../');

const { cleanDatabase, createPosts } = require('../helpers');

describe('GET /api/posts', async () => {
  before(async () => {
    await createPosts();
  });

  after(async () => {
    await cleanDatabase();
  });

  it('Successfully retrieves multiple blog posts in the correct order', async () => {
    const res = await request(api)
      .get('/api/posts');

    expect(res.status).to.equal(200);
    expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
    expect(res.body[0]._id).to.equal(0);
    expect(res.body[1]._id).to.equal(1);
    expect(res.body[0].title).to.equal('0');
    expect(res.body[1].title).to.equal('1');
  });
});
