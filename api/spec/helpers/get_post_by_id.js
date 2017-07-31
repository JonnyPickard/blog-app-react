const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb://localhost:27017/blogapp';

const getPostById = async (_id) => {
  const db = await MongoClient.connect(mongoUrl);
  const post = await db.collection('blogposts').findOne({ _id });
  return post;
};

module.exports = getPostById;
