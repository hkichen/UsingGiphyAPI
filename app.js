var animals = ["hedgehog", "lion", "panda", "leopard"];

function displayanimalInfo() {
    
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=M2AmmNcEldFA1hbYSpqNmQFVZCyD8eGV&limit=10";
    
    // Creating an AJAX call for the specific animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            // Creating a div to hold the animal
            var animalDiv = $("<div class='animal'>");
            var rating = results.rating;
            var pOne = $("<p>").text("Rating: " + rating);
            animalDiv.append(pOne);
            
            var imgURL = results[i].images.fixed_height_still.url;
            var imageAnimate = results[i].images.fixed_height.url
            //console.log(results[i]);
            var image = $("<img>").attr("src", imgURL);
            $(image).attr("class", "gif");
            $(image).attr("data-state", "still");
            $(image).attr("data-animate", imageAnimate);
            $(image).attr("data-still", imgURL);
            //console.log(image);
            animalDiv.append(image);
            
            $("#animals-view").append(animalDiv);
        }
        
        $(".gif").click(function(event) {
            console.log(event);
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", event.currentTarget.dataset.animate);
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", event.currentTarget.dataset.still);
                $(this).attr("data-state", "still");
            }
            
        })
    });
}

// Function for displaying animal data
function renderButtons() {
    $("#buttons-view").empty(); //empties div to prevent repeat clutter
    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.addClass("animal-btn");
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#buttons-view").append(a);
    }
}

// When animal btn is clicked
$("#add-animal").on("click", function(event) {
    event.preventDefault();
    var animal = $("#animal-input").val().trim(); //grabs input
    animals.push(animal); //pushes input to animals array
    renderButtons(); //make a btn 
});

$(document).on("click", ".animal-btn", displayanimalInfo);
renderButtons();
</script>