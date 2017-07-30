const mongoose = require('mongoose');
const blogPostSchema = require('../../blog-post-model/schema');

const BlogPost = mongoose.model('BlogPost', blogPostSchema, 'blogposts');

const createPost = async () => {
  const index = '1';

  try {
    await BlogPost.create({
      _id: 1,
      title: index,
      categories: index,
      content: index,
    });
    console.log('Successfully created a single post');
  } catch (err) {
    console.log(err);
  }

  mongoose.disconnect();
};

module.exports = createPost;
