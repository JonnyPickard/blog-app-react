const mongoose = require('mongoose');
const blogPostSchema = require('./schema');

const BlogPost = mongoose.model('BlogPost', blogPostSchema, 'blogposts');

const getMany = async () => {
  const post = await BlogPost
    .find()
    .sort({ created_at: 1, _id: 1 })
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
  await new BlogPost(postObject)
    .save();
};

const deleteOneById = async (_id) => {
  await BlogPost
    .deleteOne({ _id });
};

module.exports = {
  getMany,
  getOneById,
  createOne,
  deleteOneById,
};
