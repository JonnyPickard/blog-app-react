const mongoose = require('mongoose');

const blogPostSchema = require('../../models/blog-post/schema');

const BlogPost = mongoose.model('BlogPost', blogPostSchema, 'blogposts');

const createPost = async () => {
  const index = '1';

  try {
    const post = await BlogPost.create({
      title: index,
      categories: index,
      content: index,
    });

    return post;
  } catch (err) {
    throw err;
  }
};

module.exports = createPost;
