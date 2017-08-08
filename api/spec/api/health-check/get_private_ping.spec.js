const { expect } = require('chai');
const request = require('supertest');

const api = require('../../../');

describe('GET /private/ping', () => {
  it('Returns a 200 status code', async () => {
    const res = await request(api)
      .get('/private/ping');

    expect(res.status).to.equal(200);
  });
});
