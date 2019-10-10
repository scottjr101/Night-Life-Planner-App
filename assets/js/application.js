//Materialize Modals
$(document).on('DOMContentLoaded', () => {

    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    let items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });

  $(document).ready(function(){

    let apikey = "f7iOI1K6ZSelrJQmQ9kZrXMGns1biEKR";
    //default postal code
    let TMpostCode = "30092";

    let TMkeyword = "football";

    let TMevents = "/discovery/v2/events";

    let TMsuggest = "/discovery/v2/suggest";

    let queryURL = `https://app.ticketmaster.com${TMevents}.json?apikey=${apikey}&countryCode=us`

    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "json",

      }).then(function(response) {
        console.log(response);
        let TM = response._embedded.events

        for (let a = 0; a < TM.length; a++){
            console.log(TM[a]);
            
        }
      });



})