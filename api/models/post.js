const mongoose = require("mongoose");
const moment = require('moment-timezone')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },   
  summary: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
    unique: true,
  },
  file: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: moment().tz('Your_Timezone').add(1, 'hours').toDate(),
  }
});  

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
