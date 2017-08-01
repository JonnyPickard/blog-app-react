const { expect } = require('chai');
const request = require('supertest');
const api = require('../../');

const { cleanDatabase, createPosts } = require('../helpers');

describe('GET /api/posts when posts exist', async () => {
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
    expect(res.body[0].categories).to.equal('0');
    expect(res.body[0].title).to.equal('0');
    expect(res.body[1].categories).to.equal('1');
    expect(res.body[1].title).to.equal('1');
  });
});

describe('GET /api/posts when no posts exist', async () => {
  it('Successfully retrieves multiple blog posts in the correct order', async () => {
    const res = await request(api)
      .get('/api/posts');

    expect(res.status).to.equal(200);
    expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
    expect(Array.isArray(res.body));
    expect(res.body.length).to.equal(0);
  });
});
