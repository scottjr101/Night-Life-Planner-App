//Materialize Modals
$(document).on('DOMContentLoaded', () => {

    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    let items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });

  $(document).ready(function(){
    let queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=f7iOI1K6ZSelrJQmQ9kZrXMGns1biEKR&postalCode=30092"

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
      });



})