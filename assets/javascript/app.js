// Initial array of cartoons
var cartoons = ["Steven Universe", "Adventure Time", "Dexter's Labratory", "He-man"];

// displayCartoonGiphys function re-renders the HTML to display the appropriate content

function displayCartoonGiphys(cartoonName) {

    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=l15YkF1RxOcrrgcL8u1McUOYMdfD4cYi&tag=" + cartoonName;

    // Creating an AJAX call for the specific cartoon button being clicked

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


        var animatedGif = response.data.images.original.url;
        var pausedGif = response.data.images.original_still.url;


        // stores the html for the image
        var cartoonImage = $("<img>");

        // adds attributes to image elment 
        cartoonImage.attr("src", pausedGif);
        cartoonImage.attr("data-paused", pausedGif);
        cartoonImage.attr("data-animated", animatedGif);
        cartoonImage.attr("alt", "cartoon image");
        cartoonImage.attr("width", "200px");
        cartoonImage.addClass("playOnClick mr-3 mb-3");

        // adds it to the DOM
        $("#results-area").prepend(cartoonImage);
    });
}

// Function for displaying cartoon data
function renderButtons() {
    $("#button-area").empty();
    for (var i = 0; i < cartoons.length; i++) {
        var a = $("<button>");
        a.addClass("cartoon-btn btn btn-primary mr-3");
        a.attr("data-name", cartoons[i]);
        a.attr("onclick", "buttonClicked(\"" + cartoons[i] + "\")");
        a.text(cartoons[i]);
        $("#button-area").append(a);
    }

}


//animates and pauses gif on hover
$(document).on('click','.playOnClick', function(){
    if ($(this).attr('src') == $(this).data('paused')) {
        $(this).attr('src', $(this).data('animated'));
    } else {
        $(this).attr('src', $(this).data('paused'));
    }
});


function buttonClicked(cartoonName) {
    for (var i = 0; i < 10; i++) {
        displayCartoonGiphys(cartoonName);
    }

}

// This function handles events where a cartoon button is clicked
$("#add-cartoon").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var cartoon = $("#user-input").val().trim();
    if (cartoon == "") {
        $("#cartoon-form")[0].reset();
        return;
    }

    // Adding movie from the textbox to our array
    cartoons.push(cartoon);

    // Calling renderButtons which handles the processing of our movie array

    renderButtons();
    $("#cartoon-form")[0].reset();

});



// // Calling the renderButtons function to display the intial buttons
renderButtons();
//}


//my api gify key: l15YkF1RxOcrrgcL8u1McUOYMdfD4cYi

//https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=keanu