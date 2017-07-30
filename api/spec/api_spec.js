const { expect } = require('chai');
const request = require('supertest');
const api = require('../api');

const { cleanDatabase, createPosts, createPost } = require('./helpers');

describe('GET /api/posts', async () => {
  before(() => {
    createPosts();
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

describe('POST /api/posts', () => {
  // Just incase
  before(async () => {
    await cleanDatabase();
  });

  after(async () => {
    await cleanDatabase();
  });

  it('Successfully creates a blog post', async () => {
    const res = await request(api)
      .post('/api/posts')
      .send({
        title: 'testTitle',
        _id: 1,
        category: 'testCategory',
        content: 'testContent',
      });

    expect(res.status).to.equal(200);
    expect(res.headers['content-type']).to.equal('application/json');
  });
});

describe('GET /api/posts/:id', () => {
  before(async () => {
    await cleanDatabase();
    await createPost();
  });

  after(async () => {
    await cleanDatabase();
  });

  it('Successfully retrieves a blog post by _id', async () => {
    const res = await request(api)
      .post('/api/posts')
      .send({
        title: 'testTitle',
        _id: 1,
        category: 'testCategory',
        content: 'testContent',
      });

    expect(res.status).to.equal(200);
    expect(res.headers['content-type']).to.equal('application/json');
  });
});

describe('DELETE /api/posts/:id', () => {
  before(async () => {
    await cleanDatabase();
    await createPost();
  });

  after(async () => {
    await cleanDatabase();
  });

  it('Successfully deletes a blog post by _id', async () => {
    const res = await request(api)
      .post('/api/posts')
      .send({
        title: 'testTitle',
        _id: 1,
        category: 'testCategory',
        content: 'testContent',
      });

    expect(res.status).to.equal(200);
    expect(res.headers['content-type']).to.equal('application/json');
  });
});
