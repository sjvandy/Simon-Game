var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;

$(document).keydown(function (e) { 
    if(e.key == "a"){
        nextSequence();
    }    
});

function nextSequence(){
    level++;
    $("h1").text(`Level ${level}`);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    $(`#${randomChosenColor}`).fadeOut("fast").fadeIn("fast");
    playSound(randomChosenColor);
}

$(".btn").click(function (e) { 
    var userChoosenColor = this.id;
    userClickPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
        
});

function playSound(name){
    var buttonSound = new Audio(`sounds/${name}.mp3`);
    buttonSound.play();    
}

function animatePress(currentColor){
    $(`.${currentColor}`).addClass("pressed");
    setTimeout(() => {
        $(`.${currentColor}`).removeClass("pressed");
    }, 100);
}
