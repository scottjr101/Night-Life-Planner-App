
$("#add-movie-btn").on("click", function (event) {
    event.preventDefault();

var zipCode = $("#zip-code-input").val().trim();
var queryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=2019-10-07&zip=" + zipCode + "&radius=10&api_key=h22mr6gbzmesjmx4jb5qt67b"

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

});

});