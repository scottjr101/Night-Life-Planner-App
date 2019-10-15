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

    let sideNav = $(".sidenav");
    M.Sidenav.init(sideNav);
    
    let slider = $(".slider");
    M.Slider.init(slider, {
      indicators: false,
      height: 350,
      transition: 350,
      interval: 6000
    });
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
        let TMqueryURL = `https://app.ticketmaster.com${TMevents}.json?apikey=${TMapikey}&startDateTime=${TMstart}T08:00:00Z&endDateTime=${TMend}T23:00:00Z&city=${TMcity}&size=30&sort=date,asc`
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
                        eventImage.attr('data-name', TM[a].name)
                        eventImage.attr('data-id', TM[a].id)
                        eventImage.attr('data-img', imageUrl)
                        eventImage.attr('data-link', TM[a].url)
                        eventImage.attr('ondragstart', "drag(event)")
                        eventImage.attr('drgaggable', true)
                        eventImage.attr("title", "Drag this to favorites to save for later");
                        eventImage.addClass('eventImg');   
                        
                        let aDiv = $('<div>');
                        aDiv.addClass('card-action');

                        let ticketLink = $("<a>")
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

        // Create search input and url variables

// *REMINDER* Check doucmentation for more specific search parameters relating to location
        var citySearch = $("#z-city-input").val().trim();
        var keywordSearch = $("#z-keyword-input").val().trim();
        // var zQueryURL = "https://developers.zomato.com/api/v2.1/search?q="+citySearch+"+"+keywordSearch+"&sort=rating&order=desc";

        "https://developers.zomato.com/api/v2.1/search?entity_id=288&entity_type=city&q=bars+decatur&sort=rating&order=desc",
        
      $.ajax({  
        url: "https://developers.zomato.com/api/v2.1/search?q="+citySearch+"+"+keywordSearch+"&sort=rating&order=desc",
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
            // console.log(response.restaurants[b].restaurant.name);
            // create html element to hold desired response object data
            var display = $("<div class='bar-display'>");
            // Establishment Name
            var name = response.restaurants[b].restaurant.name;
            var nameTag = $("<p id='name-tag'>").text(name);
            // Type of Cuisine
            var cuisine = response.restaurants[b].restaurant.cuisines;
            var cuisineTag = $("<p>").html('<b>Cuisines: </b>' + cuisine);
            // Address
            var address = response.restaurants[b].restaurant.location.address;
            var addressTag = $("<p>").html('<b>Address: </b>' + address);
            // Rating
            var rating = response.restaurants[b].restaurant.user_rating.aggregate_rating;
            var ratingTag = $("<p>").html('<b>Rating: </b>' + rating);
            // Phone Number
            var phone = response.restaurants[b].restaurant.phone_numbers;
            var phoneTag = $("<p>").html('<b>Phone: </b>' + phone);
            // Establishment Image
            var image = response.restaurants[b].restaurant.thumb;
            var imageTag = $("<img class='bar-images'>");
            imageTag.attr('src', image);
            display.append(nameTag,ratingTag,"<br>",imageTag,cuisineTag,addressTag,phoneTag);
            // Append display content to index
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
let movieGrabbed = false;
let eventGrabbed = false;
let placeGrabbed = false;

let eventName;
let movieName;
let placeName;

let eventId; 
let placeId; 

let movieImg;
let eventImg;
let placeImg;

let movieLink;
let eventLink;
let placeLink;

let favMovies = [];
let favEvents = [];
let favPlaces = [];
// ===========DRAG & DROP ===========================
$(document).on('dragstart', ".favMovieDrag", function saveData (){
    movieName = $(this).attr("data-name")
    movieImg = $(this).attr("data-Img")
    movieLink = $(this).attr("data-link")
    movieGrabbed = true;
})

$(document).on('dragstart', ".eventImg", function saveData (){
    eventName = $(this).attr("data-name")
    eventId = $(this).attr("data-id")
    eventImg = $(this).attr("data-img")
    eventLink = $(this).attr("data-link")
    eventGrabbed = true;
    console.log(eventName)
    console.log('working')
})

$(document).on('dragstart', ".favPlaceDrag", function saveData (){
    placeName = $(this).attr("data-name")
    placeId = $(this).attr("data-id")
    placeImg = $(this).attr("data-Img")
    placeLink = $(this).attr("data-link")
    placeGrabbed = true;
})

function drag(event){
    event.dataTransfer.setData("text", event.target.id);
    console.log(event.target.id)
}


//need to find out how to define drop zone by id or class
function allowDrop(event){
    event.preventDefault()
}

function dropEvent(event){
    event.preventDefault()
    if (movieGrabbed){
        favEvents.push(eventName);
        console.log('movie drop')
        movieGrabbed = false;
    }else if(eventGrabbed){
        console.log('event drop')
        eventGrabbed = false;
        
    }else if(placeGrabbed){
        console.log('place drop')
        placeGrabbed = false;
}
$(".favorites").empty()

favEvents.push(eventName)
favPlaces.push(placeName)
console.log(favMovies)
console.log(favEvents)
console.log(favPlaces)

for (let y = 0; y < favTopicsName.length; y++){
    var newButton = $("<button>")
    newButton.attr("data-name", favTopicsName[y]);
    newButton.attr("data-ID", favTopicsID[y]);
    newButton.addClass("favored btn btn-warning btn-outline-dark");
    newButton.text(favTopicsName[y]);
    $(".favorites").append(newButton)
}
}
