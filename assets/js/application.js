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
$(document).ready(() => {

  $("#add-movie-btn").click((event) => {

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
        var rating = response[i].ratings[0].code;
        var p1 = $("<p>").text(title + ' rated: ' + rating);
        div.append(p1);
        var poster = "https://cuso.tmsimg.com/" + response[i].preferredImage.uri;
        var image = $('<img>');
        image.attr('src', poster);
        div.append(image);
        div.append('<br>');
        var genres = response[i].genres;
        var p2 = $("<p>").text('Genre(s): ' + genres);
        div.append(p2);
        var shortDescrip = response[i].shortDescription;
        var p3 = $("<p>").text('plot: ' + shortDescrip);
        div.append(p3);
        div.append('<br>');
        $("#movies-view").append(div);

      };
    });
  });
 
    $("#add-event-btn").click((ev)=>{
        
        M.Modal.getInstance($("#modal-events")).close();

        ev.preventDefault();

        const TMapikey = "f7iOI1K6ZSelrJQmQ9kZrXMGns1biEKR";
        const TMevents = "/discovery/v2/events";
        //default postal code
        let TMstart = $("#tm-start-date-input").val().trim();
        let TMend = $("#tm-end-date-input").val().trim();        
        let TMcity = $("#tm-city-input").val().trim();;        
        // let TMevents = "/discovery/v2/attractions";

        console.log(TMend);
        console.log(TMstart);
        
        //the dmaId is the code ticket master uses for cities, 220 = atlanta 
        let TMqueryURL = `https://app.ticketmaster.com${TMevents}.json?apikey=${TMapikey}&startDateTime=${TMstart}T08:00:00Z&endDateTime=${TMend}T23:00:00Z&city=${TMcity}&size=30`
        let eventNames = [];
        let eventData = [];
            $.ajax({
                url: TMqueryURL,
                method: "GET",

            }).then((response)=> {
                console.log(response);
                const TM = response._embedded.events;
                for (let a = 0; a < TM.length; a++){
                    let name = TM[a].name;

                    let used = eventNames.indexOf(name) > 0;
                    let c = eventNames.indexOf(name);
                    console.log(c)
                    
                    if (!used){
                        eventNames.push(name);
                        //console.log(eventNames)

                        let imageUrl = String;
                        let imgHeight = 0;

                        for (let b = 0; b < TM[a].images.length; b++){
                            if (TM[a].images[b].height >= 300 && TM[a].images[b].height > imgHeight){
                                imgHeight = TM[a].images[b].height;
                                imageUrl = TM[a].images[b].url;
                            }
                        }
                        let mainDiv = $("<div>");
                        mainDiv.addClass('bigDiv');

                        let cardDiv = $("<div>");
                        cardDiv.addClass('eventDiv card blue-grey darken-1 nextDiv');
                        cardDiv.attr('data-id', a);
                        eventData.push(a);

                        let contentDiv = $("<div>");
                        contentDiv.addClass('card-content imgDiv');
                        
                        let spanTitle = $("<span>");
                        spanTitle.addClass('card-title');
                        spanTitle.text(TM[a].name);
                        
                        let eventImage = $("<img>");
                        eventImage.attr("src", imageUrl);
                        eventImage.addClass('eventImg');   
                        
                        let aDiv = $('<div>');
                        aDiv.addClass('card-action');

                        let ticketLink = $("<a>");
                        ticketLink.attr('href', TM[a].url);
                        ticketLink.attr('target', '_blank');
                        ticketLink.text('Ticket Link');

                        let date = new Date(`${TM[a].dates.start.localDate}T${TM[a].dates.start.localTime}Z`);
                        console.log(date)
                        var newDate = date.toString('dd-MM-yy');
                        let n = newDate.indexOf("GMT")            
                        console.log(n)
                        str = newDate.slice(0,n)
                        let timeDate = $("<p>");
                        timeDate.text(str);
                        
                        
                        $("#local-events").append(mainDiv);
                        $(mainDiv).append(cardDiv);
                        $(cardDiv).append(contentDiv);
                        $(contentDiv).append(spanTitle);
                        $(contentDiv).append(eventImage);
                        $(cardDiv).append(ticketLink);
                        $(cardDiv).append(timeDate);

                        
                    }else{
                        console.log(name);
                        // let div = $("<div>");
                        // div.text("test " + a);
                        // div.addClass("eventInfo");
                        // $(`[data-id="${c}]`).append(div);
                    }

                };

                
            });//then
        
        
    });//click events
    $("#add-place-btn").click((barSearch)=>{

        barSearch.preventDefault();
  
        // var barKey = "user-key=56127d7074bb1c0676f5c2ffcf0456e7"
        // var barQueryURL = "https://developers.zomato.com/api/v2.1/search?"
        // var barCity = "&cities=Atlanta" 
        // var barsPubs = "&catagories=11"
  
        
      $.ajax({  
        url: "https://developers.zomato.com/api/v2.1/search?entity_id=288&entity_type=city&q=bars+decatur&sort=rating&order=desc",
        dataType: 'json',
        async: true,
        beforeSend: function(xhr){xhr.setRequestHeader('user-key', 
        '56127d7074bb1c0676f5c2ffcf0456e7');},  // This inserts the api key into the HTTP header
      }).then(function (response){
          console.log(response);
          // clear search results from DOM
          $("#movies-view").empty();
          $("#local-events").empty();
          $("#view-places").empty();
          // Iterate through response array
          for (var b = 0; b < 20; b++){
            console.log(response.restaurants[b].restaurant.name);
            // create html element to hold desired response object data
            var display = $("<div class='bar-display'>");
            var name = response.restaurants[b].restaurant.name;
            var nameTag = $("<p>").text(name);
            var image = response.restaurants[b].restaurant.thumb;
            var imageTag = $('<img>');
            imageTag.attr('src', image);
            display.append(nameTag, imageTag);
            $("#view-places").append(display);



            // console.log(response.restaurants[b].restaurant.thumb);
            // console.log(response.restaurants[b].restaurant.location.locality);
          }
  
        
        // success: function(response) {
          // }
        }

      

    )
  })

}); //Ready