const cleanDatabase = require('./clean_database');
const createPosts = require('./create_posts');
const createPost = require('./create_post');
const getPostById = require('./get_post_by_id');

module.exports = {
  cleanDatabase,
  createPosts,
  createPost,
  getPostById,
};
