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


    let apikey = "f7iOI1K6ZSelrJQmQ9kZrXMGns1biEKR";
    //default postal code
    let TMpostCode = $("#zip-code-input").val().trim();

    let TMradius = $("#radius-input").val().trim()
    
    let TMkeyword = "concert";
    
    let TMevents = "/discovery/v2/attractions";

    let TMsuggest = "/discovery/v2/suggest";

        console.log(TMradius)
        console.log(TMpostCode)
    let queryURL = `https://app.ticketmaster.com${TMsuggest}.json?apikey=${apikey}&postalCode=${TMpostCode}&radius=${TMradius}&keyword=${TMkeyword}`

    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "json",

      }).then(function(response) {
        console.log(response);
        let TM = response._embedded.attractions

        for (let a = 0; a < TM.length; a++){
            console.log(TM[a]);
            
            let nDiv = $("<div>");
            $("#local-events").append(nDiv);

            let nImg = $("<img>");
            nImg.attr("src", TM[a].images[0].url);

            $(nDiv).append(nImg)
        }
        
      });

    })

})