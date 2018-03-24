var topics = ["cat", "dog", "bird", "zebra", "panda", "racoon", "alpaca"];
//make a button from the above array
function makeABtn() {
    $("#add-animal").on("click", function(event) {
        $("#addAnimalBtnHere").empty();
        for (var i=0; i < topics.length; i++) {
            event.preventDefault();
            var animalBtn = $("<button>");
        
            animalBtn.addClass("animal-btn");
            animalBtn.attr("data-animal", topics[i]);
            animalBtn.text(topics[i]);
            $("#addAnimalBtnHere").append(animalBtn);
            makeABtn();  
        } 
    })
};

//make a button from user input
$("#add-animal").on("click", function(event) {
    event.preventDefault();
    var animals = $("#animal-input").val().trim();
    $("#add-animal").push(animals);
    makeABtn();
  });

$("button").on("click", function() {
    var animal = $(this).val();
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=M2AmmNcEldFA1hbYSpqNmQFVZCyD8eGV&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(queryURL);
        console.log(response);
        var results = response.data;
        
        for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);
            
            animalDiv.append(p);
            animalDiv.append(animalImage);
            
            $("#gifs-appear-here").prepend(animalDiv);
        }
    });
});
