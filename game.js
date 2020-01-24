var userClickedPattern = [];
var i=0;

var start = false;
var level = 0;
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor); 
    $("h1").text("Level " + (++level));
    console.log(i);
}

$(document).keydown(function () {
    if(start===false) {
        start=true;
        userClickedPattern = [];
        nextSequence();
        $(".btn").click(function () {
            var userChosenColor = $(this).attr("id");
            userClickedPattern.push(userChosenColor);
            console.log(userClickedPattern);
            console.log(gamePattern);
            playSound(userChosenColor);
            animatePress(userChosenColor);
            checkAnswer();
        });
    }
});

function playSound(name) {
    var srcAudio = "sounds/" + name + ".mp3";
    var audio = new Audio(srcAudio);
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
            $("#" + currentColor).removeClass("pressed");
        },100);
}

function checkAnswer() {
    console.log(i);
    if(i<level) {
        if (userClickedPattern[i] === gamePattern[i]) { 
            i++;
            if (i==level) {
                console.log("Success");
                i=0;
                userClickedPattern = [];
                setTimeout(nextSequence,1000);
            }   
        }
        else {
            console.log("wrong");
            $("h1").text("Game Over, Press Any Key to Restart")
            $("body").addClass("game-over");
            playSound("wrong");
            setTimeout(function () {
                    $("body").removeClass("game-over");
                },200);
            startOver();
        }
    }
}

function startOver() {
    level=0;
    i=0;
    gamePattern = [];
    userClickedPattern =[];
    start=false;
    $(".btn").unbind();
}