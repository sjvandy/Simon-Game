var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickPattern = [];



var level = 0;
var started = false;

$(document).keydown(function (e) { 
    if(!started){
        $("#level-title").text(`Level ${level}`);
        $("p").text("");
        nextSequence();
        started = true;
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
    if(started){
        if(gamePattern[currentLevel] === userClickPattern[currentLevel]){
            if(userClickPattern.length === gamePattern.length){
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }
            
        }else{
            playSound("wrong");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            $("p").text("Your score was " + (level - 1));
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 100);
            startOver();
        }
    }
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}

$("#tutorial-icon").click(function () {     
    alert("Watch what color the computer picks and try to memorize it! Each round the computer will keep adding colors for you to memorize and repeat its pattern. Select one wrong color and you lose!");
});