var userClickedPattern = []
var gamePattern = []
var buttonColours = ["red", "blue", "green", "yellow"]

var level = 0

var started = false

// keypress eventlistener
$(document).keypress(function(event) {
  if (!started) {
    $('h1').text('Level ' + level)
    nextSequence()
    started = true;
  }
})


// click eventlistener
$('.btn').click(function(e ){
  var userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour)

  playSound(userChosenColour)
  animatePress(userChosenColour)
  checkAnswer(userClickedPattern.length-1)
})


// Checking the user answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('success')
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      },1000)
    }
  }
  else {
    playSound("wrong")
    $('body').addClass('game-over')
    $('h1').text('Game Over, Press Any Key to Restart')

    setTimeout(function() {
      $('body').removeClass('game-over')
    },200)
    startOver()
  }
}


function nextSequence() {
  userClickedPattern = []
  level++
  $('h1').text('Level ' + level)

  var randomNumber = Math.floor(Math.random() * 4)
  randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  console.log(gamePattern)

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)
}


// playing Sound
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3')
  audio.play()
}


// button animation
function animatePress(currentColour) {
  console.log(currentColour)
  $('#' + currentColour).addClass('pressed')

  setTimeout(function() {
    $('#' + currentColour).removeClass('pressed')
  },100)
}


// restarting the gamePattern
function startOver() {
  level = 0
  gamePattern = []
  started = false
}
