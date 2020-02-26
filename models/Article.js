const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let articleSchema = new Schema({
  title: {
    type: String
  },
  link: {
    type: String
  },
  summary: {
    type: String
  }
});

let Article = mongoose.model("Article", articleSchema);

module.exports = Article;
