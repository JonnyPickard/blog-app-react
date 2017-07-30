const mongoose = require('mongoose');
const blogPostSchema = require('./schema');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/blogapp', (err) => { if (err) console.log(err); });

const BlogPost = mongoose.model('BlogPost', blogPostSchema, 'blogposts');

const handleError = (err) => {
  console.log(err);
  throw err;
};

const getMany = () =>
  BlogPost
    .find()
    .sort({ created_at: 1, _id: 1 })
    .limit(40)
    .exec((err, posts) => {
      mongoose.disconnect();
      if (err) return handleError(err);
      return posts;
    });

const getOneById = (_id) => {
  BlogPost
    .findOne({ _id }, (err, post) => {
      if (err) return handleError(err);
      return post;
    });
};

const createOne = (postObject) => {
  new BlogPost(postObject)
    .save((err, post) => {
      if (err) return handleError(err);
      return post;
    });
};

const deleteOneById = (_id) => {
  BlogPost
    .remove({ _id }, (err, post) => {
      if (err) return handleError(err);
      return post;
    });
};

module.exports = {
  getMany,
  getOneById,
  createOne,
  deleteOneById,
};
