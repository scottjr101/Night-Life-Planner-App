
$("#add-movie-btn").on("click", function (event) {
    event.preventDefault();

var startDate = $("#start-date-input").val().trim();
var zipCode = $("#zip-code-input").val().trim();
var radius = $("#radius-input").val().trim();
var queryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + startDate + "&zip=" + zipCode + "&radius=" + radius + "&api_key=h22mr6gbzmesjmx4jb5qt67b"

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      console.log(response);
      $("#movies-view").empty();
    for (var i = 0; i < 100; i++) {
       var div = $("<div class='movie_view'>");
       var poster = "https://cuso.tmsimg.com/" + response[i].preferredImage.uri;
       var image = $('<img>')
       image.attr('src', poster)
       div.append(image);
       var title = response[i].title;
       var hTwo = $("<h2>").text("Title: " + title);
       div.append(hTwo);
       $("#movies-view").append(div);

    };

});
      $("#start-date-input").val("")
      $("#zip-code-input").val("")
      $("#radius-input").val("")
});