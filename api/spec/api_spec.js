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


// 
// describe('POST /api/posts', () => {
// 
// });
// 
// describe('GET /api/posts/:id', () => {
// 
// });
// 
// describe('DELETE /api/posts/:id', () => {
// 
// });
// 
// describe('POST /users/create', () => {
//   afterEach(async () => {
//     await dropUsersDb();
//   });
// 
//   it('Saves a valid new User successfully', async () => {
//     const user = {
//       username: 'testuser1',
//       password: 'Testuser1password',
//       passwordConfirmation: 'Testuser1password',
//       email: 'testuseremail@test.com',
//     };
// 
//     const res = await request(app)
//       .post('/users/create')
//       .send({ user });
// 
//     expect(res.status).to.equal(200);
//   });
