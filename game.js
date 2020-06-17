var gamePattern = [];
var gameColor = ["red", "green", "blue", "yellow"];
var userChosenColor;
var level = 0;
var started = false;
var userChosenPattern = [];
// Generate next sequence
function nextSequence() {
  userChosenPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var nextColor = gameColor[randomNumber];
  gamePattern.push(nextColor);
  playSound(nextColor);
  animate(nextColor);
}

//Start game
$(".start").click(function() {
  startGame();
})
$(document).keydown(function() {
  startGame();
})

function startGame() {
  if (!started) {
    nextSequence();
    $("h1").text("Level 1");
    started = true;
  }
}
//Get user input
$(".btn").click(function() {
  userChosenColor = $(this).attr("id");
  userChosenPattern.push(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userChosenPattern.length - 1);
  $(this).addClass("pressed");

  setTimeout(function() {
    $("#" + userChosenColor).removeClass("pressed");
  }, 100);
})

//Check Answer
function checkAnswer(currentColor) {
  if (userChosenPattern[currentColor] === gamePattern[currentColor]) {
    if (userChosenPattern.length === gamePattern.length) {
      console.log("success");
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  } else {
    $("h1").text("Game Over!!! Press A Key to Start");
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    started = false;
    gamePattern = [];
    level = 0;

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 1000);
  }
}
// Play audio
function playSound(name) {
  var colorSound = new Audio("sounds/" + name + ".mp3");
  colorSound.play();
}

// Play animation
function animate(name) {
  $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
}
