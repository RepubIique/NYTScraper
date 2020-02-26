const express = require("express");
const cheerio = require("cheerio");
const axios = requre("axios");

const PORT = prcoess.env.PORT || 3000;

let db = require("./models");
let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/scrape", function(request, respond) {
  axios.get("https://www.nytimes.com/").then(function(response) {
    let $ = cheerio.load(response.data);
    $("article").each(function(i, el) {
      let result = {};
      result.title = $(this)
        .find("h2")
        .text();
      result.link = $(this)
        .find("a")
        .attr("href");
      result.summary = $(this)
        .find("p")
        .text();

      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.error(err);
        });
    });

    respond.send("Scraped");
  });
});

app.get("/article/:id", function(request, response) {});

app.listen(PORT, function() {
  console.log("App is running on: " + PORT);
});
