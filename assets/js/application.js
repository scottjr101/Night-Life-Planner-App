
//Materialize Modals
$(document).on('DOMContentLoaded', () => {

    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    let items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });

  $(document).ready(function(){

    $("#add-movie-btn").on("click", (event)=>{

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
            for (var i = 0; i < 10; i++) {
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

    })

    });

    $("#add-event-btn").on("click", (ev)=>{

        ev.preventDefault();


        let TMapikey = "f7iOI1K6ZSelrJQmQ9kZrXMGns1biEKR";
        //default postal code
        let TMpostCode = $("#tm-zip-code-input").val().trim();

        let TMradius = $("#tm-radius-input").val().trim();
        
        let TMkeyword = "music";
        
        let TMevents = "/discovery/v2/attractions";

        let TMsuggest = "/discovery/v2/suggest";

            console.log(TMradius)
            console.log(TMpostCode)
        let TMqueryURL = `https://app.ticketmaster.com${TMsuggest}.json?apikey=${TMapikey}&postalCode=${TMpostCode}&radius=${TMradius}&keyword=${TMkeyword}&limit=5`

        $.ajax({
            url: TMqueryURL,
            method: "GET",

        }).then(function(response) {
            console.log(response);
            const TM = response._embedded.attractions

            for (let a = 0; a < TM.length; a++){
                console.log(a);
                
                let nDiv = $("<div>");
                let nImg = $("<img>");
                
                nImg.attr("src", TM[a].images[0].url);
                
                $("#local-events").append(nDiv);
                $(nDiv).append(nImg)
            }
            
        });

    });


     
});
