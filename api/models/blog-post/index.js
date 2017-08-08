const mongoose = require('mongoose');

const blogPostSchema = require('./schema');

const BlogPost = mongoose.model('BlogPost', blogPostSchema, 'blogposts');

const getMany = async () => {
  const post = await BlogPost
    .find()
    .sort({ created_at: 1 })
    .limit(40)
    .exec();

  return post;
};

const getOneById = async (_id) => {
  const post = await BlogPost
    .findOne({ _id });

  return post;
};

const createOne = async (postObject) => {
  const post = await new BlogPost(postObject)
    .save();

  return post;
};

const deleteOneById = async (_id) => {
  const post = await BlogPost.find({ _id });

  await BlogPost.find({ _id })
    .remove()
    .exec();

  return post;
};

module.exports = {
  getMany,
  getOneById,
  createOne,
  deleteOneById,
};
