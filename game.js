var level = 0;
var userClickedPattern = [];
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

function nextSeqeunce() {
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("." + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  level++;
}

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log(userClickedPattern);
  console.log(gamePattern);
  if (userClickedPattern.length === gamePattern.length) {
    checkAnswer(userClickedPattern.length);
  }
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  console.log(currentColour);
  $("." + currentColour)
    .toggleClass("pressed")
    .delay(100)
    .queue(function(next) {
      $(this).toggleClass("pressed");
      next();
    });
}

function checkAnswer(currentLevel) {
  for (var i = 0; i < currentLevel; i++) {
    if (!(gamePattern[i] == userClickedPattern[i])) alert("you lose");
  }
  userClickedPattern = [];
  nextSeqeunce();
}

$(document).one("keydown", function(event) {
  nextSeqeunce();
});
