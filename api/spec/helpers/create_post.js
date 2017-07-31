const mongoose = require('mongoose');

const blogPostSchema = require('../../models/blog-post/schema');

const BlogPost = mongoose.model('BlogPost', blogPostSchema, 'blogposts');

const createPost = async (_id = 1) => {
  const index = '1';

  try {
    await BlogPost.create({
      _id,
      title: index,
      categories: index,
      content: index,
    });
  } catch (err) {
    throw err;
  }
};

module.exports = createPost;
