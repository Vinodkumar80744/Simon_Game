
var button_colors = ["red", "blue", "green", "yellow"];

var game_pattern = [];
var user_entered_pattern = [];

var started = false;
var level = 0;

//funvtion that begins the game after pressing a key
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    //after entering the key , it generate the sequences of buzzes by blinking.
    next_sequence();
    started = true;
  }
});

$(".btn").click(function() {

  var user_selected_color = $(this).attr("id");
  user_entered_pattern.push(user_selected_color);

  playSound(user_selected_color);
  animatePress(user_selected_color);

  checkAnswer(user_entered_pattern.length-1);
});

// for evaluation of orderds,weather they are entered correctly or not.
function checkAnswer(currentlevel) {

    if (game_pattern[currentlevel] === user_entered_pattern[currentlevel]) {
      if (user_entered_pattern.length === game_pattern.length){
        setTimeout(function () {
          next_sequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

//generates the next colors by system that should be remebered.
function next_sequence() {
  user_entered_pattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  //selects random color from the existing colors based on their indexes.
  var random_color = button_colors[randomNumber];
  game_pattern.push(random_color);

  $("#" + random_color).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(random_color);
}
//for animations
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//used to play a sound after the button was pressed.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//restarting the game
function startOver() {
  level = 0;
  game_pattern = [];
  started = false;
}
