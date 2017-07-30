const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb://localhost:27017/blogapp';

async function cleanDatabase() {
  let db;
  try {
    db = await MongoClient.connect(mongoUrl);
    await db.collection('blogposts').drop();
    console.log('Successfully cleaned database');
  } catch (err) {
    console.log(err);
  }

  if (db) db.close();
}

module.exports = cleanDatabase;
