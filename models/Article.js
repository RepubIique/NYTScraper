const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  title: {
    type: String
  },
  link: {
    type: String
  },

  summary: {
    type: String
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
