var buttonColors = ["red","blue","green","yellow"]
var gamePattern = []
var userClickedPattern = []
var sound = new Audio()
var gameStarted = false
var level = 0

// Shows history of what buttons have been clicked //
function prevSequence(level){        
    if(level < gamePattern.length){
        $("#" + gamePattern[level]).fadeOut().fadeIn()
        playSound(gamePattern[level])
        level++
        setTimeout(function(){
            prevSequence(level)
        }, 800)
    }else{
        nextSequence()
    }
}
// Adds button to sequence //
function nextSequence(){
    userClickedPattern = []
    level++
    $("h1").text("Level " + level)
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)    
    $("#" + randomChosenColor).fadeOut().fadeIn()
    playSound(randomChosenColor)
}

function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3")
    sound.play()
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                prevSequence(0)
            }, 1000)
        }
    }else{
        playSound("wrong")
        $("body").addClass("game-over")
        $("h1").text("Game Over - Press Any Key to Restart")
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200)        
        startOver()
    }
}

function startOver(){
    level = 0
    gamePattern = []
    gameStarted = false 
}

$(".btn").click(function(){    
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)
    animatePress(userChosenColor)
    playSound(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
})

$(document).keypress(function(){
    if (!gameStarted) {
        nextSequence()
        gameStarted = true    
    }    
})