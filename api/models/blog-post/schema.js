const { Schema } = require('mongoose');

const blogPostSchema = new Schema({
  title: { type: String, required: true },
  categories: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now, required: true },
});

module.exports = blogPostSchema;
