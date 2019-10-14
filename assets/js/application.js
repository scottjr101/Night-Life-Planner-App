// (function($){
//     $(function(){
  
//       $('.sidenav').sidenav();
//       $('.parallax').parallax();
  
//     }); 
    // end of document ready
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
          }).then(function (response) {
            console.log(response);
            $("#movies-view").empty();
            for (var i = 0; i < 100; i++) {
              var div = $("<div class='movie_view'>");
              var title = response[i].title;
              var p = $("<p>").text(title);
              div.append(p);
              var poster = "https://cuso.tmsimg.com/" + response[i].preferredImage.uri;
              var image = $('<img>');
              image.attr('src', poster);
              div.append(image);
              div.append('<br>');
              var a = $("<a href='../../showtimes.html'>");
              a.text("Click here for showtimes");
              div.append(a);
              $("#movies-view").append(div);
      
            };

    

    });

    });

    $("#add-event-btn").click((ev)=>{
        
        M.Modal.getInstance($("#modal-events")).close();

        ev.preventDefault();

        let TMapikey = "f7iOI1K6ZSelrJQmQ9kZrXMGns1biEKR";
        //default postal code
        let TMstart = $("#tm-start-date-input").val().trim();
        let TMend = $("#tm-end-date-input").val().trim();        
        let TMcity = $("#tm-city-input").val().trim();;        
        // let TMevents = "/discovery/v2/attractions";
        let TMevents = "/discovery/v2/events";

        console.log(TMend);
        console.log(TMstart);
        //let TMqueryURL = `https://app.ticketmaster.com${TMevents}.json?apikey=${TMapikey}&postalCode=${TMpostCode}&radius=${TMradius}`
        
        //the dmaId is the code ticket master uses for cities, 220 = atlanta &city=${TMcity} &enddatetime=${TMstart}
        let TMqueryURL = `https://app.ticketmaster.com${TMevents}.json?apikey=${TMapikey}&startDateTime=${TMstart}T08:00:00Z&endDateTime=${TMend}T23:00:00Z&city=${TMcity}`
        
            $.ajax({
                url: TMqueryURL,
                method: "GET",

            }).then((response)=> {
                console.log(response);
                const TM = response._embedded.events
                for (let a = 0; a < TM.length; a++){
                    //debugger;
                    let imageUrl = String;
                    let imgHeight = 0;
                    for (let b = 0; b < TM[a].images.length; b++){
                        if (TM[a].images[b].height >= 300 && TM[a].images[b].height > imgHeight){
                            imgHeight = TM[a].images[b].height;
                            imageUrl = TM[a].images[b].url;
                        }
                    }
                    let nDiv = $("<div>");
                    
                    
                    let nImg = $("<img>");
                    nImg.attr("src", imageUrl);
                    nImg.addClass('eventImg')
                    
                    let nP = $("<p>")
                    nP.text(TM[a].name)
                    
                    $("#local-events").append(nDiv);
                    $(nDiv).append(nP)
                    $(nDiv).append(nImg)

                }
                
            });
        
        
    });


     
});
