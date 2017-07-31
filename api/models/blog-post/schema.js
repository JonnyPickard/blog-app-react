const { Schema } = require('mongoose');

const blogPostSchema = new Schema({
  _id: { type: Number, unique: true },
  title: { type: String },
  categories: { type: String },
  content: { type: String },
  created_at: { type: Date, default: Date.now },
});

module.exports = blogPostSchema;
