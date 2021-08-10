var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  console.log("Level: " + level);
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  for (var i = 0; i < gamePattern.length; i++) {
    showGamePatternWithDelay(i);
  }
}

function showGamePatternWithDelay(index) {
  setTimeout(function () {
    $("#" + gamePattern[index])
      .fadeOut(100)
      .fadeIn(100);
    playSound(gamePattern[index]);
  }, 800 * index + 800); // Since For loops are almost instant, we need to multiply the delay by the index to add delay. 1st = 800ms, 2nd = 1600ms, 3rd = 2400ms....
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence(1000);
      });
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

$(".btn").click(function () {
  if (gameStarted) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});

$(document).keypress(function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    gameStarted = true;
    nextSequence();
  }
});
