
//Materialize Modals
$(document).on('DOMContentLoaded', () => {
    
    let modals = $('.modal');
    M.Modal.init(modals);
    
});
$(document).ready(()=>{

    $("#add-movie-btn").click((event)=>{

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

    $("#add-event-btn").click((ev)=>{
        
        M.Modal.getInstance($("#modal-events")).close();

        ev.preventDefault();

        let TMapikey = "f7iOI1K6ZSelrJQmQ9kZrXMGns1biEKR";
        //default postal code
        //let TMpostCode = $("#tm-zip-code-input").val().trim();
        //let TMradius = $("#tm-radius-input").val().trim();        
        // let TMkeyword = "music";        
        // let TMevents = "/discovery/v2/attractions";
        let TMevents = "/discovery/v2/events";

        //let TMqueryURL = `https://app.ticketmaster.com${TMevents}.json?apikey=${TMapikey}&postalCode=${TMpostCode}&radius=${TMradius}`
        
        //the dmaId is the code ticket master uses for cities, 220 = atlanta
        let TMqueryURL = `https://app.ticketmaster.com${TMevents}.json?apikey=${TMapikey}&dmaId=220`
        
            $.ajax({
                url: TMqueryURL,
                method: "GET",

            }).then((response)=> {
                console.log(response);
                const TM = response._embedded.events

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
