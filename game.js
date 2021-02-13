var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickPattern = [];

var level = 0;

$(document).keydown(function (e) { 
    if(e.key == "a"){
        $("#level-title").text(`Level ${level}`);
        nextSequence();
    }    
});

function nextSequence(){
    userClickPattern = [];
    level++;
    $("#level-title").text(`Level ${level}`);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);    
    $(`#${randomChosenColor}`).fadeOut("fast").fadeIn("fast");
    playSound(randomChosenColor);
    
    
}
/// User Clicks Button
$(".btn").click(function () { 
    var userChoosenColor = this.id;
    userClickPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickPattern.length-1);    
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

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickPattern[currentLevel]){
        if(userClickPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
        
    }else{
        playSound("wrong");

    }
}