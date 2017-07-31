const { expect } = require('chai');
const request = require('supertest');
const api = require('../../');

const { cleanDatabase, createPost } = require('../helpers');

describe('POST /api/posts', async () => {
  after(async () => {
    await cleanDatabase();
  });

  it('Successfully creates a blog post & returns 200', async () => {
    const res = await request(api)
      .post('/api/posts')
      .send({
        title: 'testTitle',
        _id: 1,
        category: 'testCategory',
        content: 'testContent',
      });

    expect(res.status).to.equal(200);
  });
});

describe('POST /api/posts with duplicate _id post', async () => {
  before(async () => {
    await createPost();
  });

  after(async () => {
    await cleanDatabase();
  });

  it('Does not create a blog post & returns 400', async () => {
    const res = await request(api)
      .post('/api/posts')
      .send({
        title: 'testTitle',
        _id: 1,
        category: 'testCategory',
        content: 'testContent',
      });

    expect(res.status).to.equal(400);
  });
});

describe('POST /api/posts with incorrect post', async () => {
  it('Does not create a blog post & returns 400', async () => {
    const res = await request(api)
      .post('/api/posts')
      .send({
        post: 'badPost',
      });

    expect(res.status).to.equal(400);
  });
});
