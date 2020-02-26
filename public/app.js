$("#scrape").on("click", function() {
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function(data) {
    console.log(data);
  });
});

$.getJSON("/articles", function(data) {
  for (let i = 0; i < data.length; i++) {
    $("#articles").append(
      "<p data-id='" +
        data[i]._id +
        "'>" +
        data[i].title +
        "<br />" +
        "<a href='" +
        "https://www.nytimes.com" +
        data[i].link +
        "'>" +
        "Article Link" +
        "</a>" +
        "<br>" +
        data[i].summary +
        "<br>" +
        "<button data-id='" +
        data[i]._id +
        "' id='add-note'>Add Note</button>" +
        "<br><br>" +
        "</p>"
    );
  }
});

$(document).on("click", "#add-note", function() {
  $("#notes").empty();
  let thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).then(function(data) {
    console.log(data);
    $("#notes").append("<h2>" + data.title + "</h2>");
    $("#notes").append("<input id='titleinput' name='title' >");
    $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
    $("#notes").append(
      "<button data-id='" + data._id + "' id='savenote'>Save Note</button>"
    );
    $("#notes").append(
      "<button data-id='" + data._id + "' id='deletenote'>Delete Note</button>"
    );

    if (data.note) {
      $("#titleinput").val(data.note.title);
      $("#bodyinput").val(data.note.body);
    }
  });
});

$(document).on("click", "#savenote", function() {
  let thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  }).then(function(data) {
    console.log(data);
    $("#notes").empty();
  });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#deletenote", function() {
  let thisId = $(this).attr("data-id");

  $.ajax({
    method: "DELETE",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  }).then(function(data) {
    console.log(data);
    $("#notes").empty();
  });
});
