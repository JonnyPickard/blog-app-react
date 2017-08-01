const { expect } = require('chai');
const request = require('supertest');
const api = require('../../');

const { cleanDatabase } = require('../helpers');

describe('POST /api/posts', async () => {
  after(async () => {
    await cleanDatabase();
  });

  it('Successfully creates a blog post & returns 200', async () => {
    const { body } = await request(api)
      .post('/api/posts')
      .send({
        title: 'testTitle',
        categories: 'testCategory',
        content: 'testContent',
      });

    expect(body.title).to.equal('testTitle');
    expect(body.categories).to.equal('testCategory');
    expect(body.content).to.equal('testContent');
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
