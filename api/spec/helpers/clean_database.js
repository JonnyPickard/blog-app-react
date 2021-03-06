const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb://localhost:27017/blogapp';

const cleanDatabase = async () => {
  const db = await MongoClient.connect(mongoUrl);
  await db.collection('blogposts').drop();
};

module.exports = cleanDatabase;
