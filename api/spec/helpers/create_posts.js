const mongoose = require('mongoose');
const blogPostSchema = require('../../models/blog-post/schema');

const BlogPost = mongoose.model('BlogPost', blogPostSchema, 'blogposts');

const mockPosts =
  Array(40)
    .fill(0)
    .map((current, index) => ({
      _id: index,
      title: index.toString(),
      categories: index.toString(),
      content: index.toString(),
    }));

const createManyPosts = async () => {
  try {
    await BlogPost.create(mockPosts);
  } catch (err) {
    throw err;
  }
};

module.exports = createManyPosts;
