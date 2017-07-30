const mongoose = require('mongoose');
const blogPostSchema = require('../../blog-post-model/schema');

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
    console.log('Successfully created many posts');
  } catch (err) {
    console.log(err);
  }

  mongoose.disconnect();
};

module.exports = createManyPosts;
