//jshint esversion: 6

const colors = ["green", "red", "yellow", "blue"];
var started = true;
var generatingPtrn = false; // to disable clicking while generating patterns
var level = 0;

var enteredPtrn = [];
var gamePtrn = [];
var i = 0;

$(document).keypress(function() {
  if (started) {
    changeHeading("Level " + (++level));
    setTimeout(() => {
      changeHeading("Level " + level);
      showAndGeneratePtrn();
    }, 800);
    started = false;
  }
});

$(".square").click(function() {
  if ((!started) && (!generatingPtrn)) {
    var btn = this.id;
    enteredPtrn.push(btn);
    playAudio(btn);
    addNdRemoveClass("#" + btn, "pressed");

    comparePtrn(i++);
  }
});

function showAndGeneratePtrn() {
  generatingPtrn = true; // disable clicking
  enteredPtrn = [];
  i = 0;

  var randomColor = colors[Math.floor(Math.random() * 4)];
  gamePtrn.push(randomColor);

  for (var k = 0; k < gamePtrn.length; k++) { // for showing previous patterns

    ((k) => {
      setTimeout(function() {
        $("." + gamePtrn[k]).fadeOut(50).fadeIn(50); //WITH ANIMATION
        playAudio(gamePtrn[k]);

        if (k === (gamePtrn.length - 1)) generatingPtrn = false; // disable clicking
      }, 800 * k);
    })(k);
  }
}

function comparePtrn(j) {
  if (enteredPtrn[j] == gamePtrn[j]) {
    if (enteredPtrn.length == gamePtrn.length) {
      level++;

      setTimeout(() => {
        changeBgColor(j);
        changeHeading("Level " + level);
        showAndGeneratePtrn();
      }, 800);


    }
  } else {
    startOver();
  }
}


function startOver() {
  changeHeading("GAME OVER, Press Any Key to Start");
  addNdRemoveClass('body', "game-over");
  playAudio('wrong');

  gamePtrn = [];
  started = true;
  generatingPtrn = false;
  level = 0;
  r = 6;
  g = 84;
  b = 113; // initial value of background color
  changeBgColor();
}

function playAudio(file) {
  var audio = new Audio("sounds/" + file + ".mp3");
  audio.play();
}


function changeHeading(info) {
  $("h1").text(info);
}

function addNdRemoveClass(tar, cls) {
  $(tar).addClass(cls);
  setTimeout(function() {
    $(tar).removeClass(cls);
  }, 100);
}

var r = 6, // for initial background color
  g = 84,
  b = 113;

function changeBgColor() {

  if (g < 190) g += 10;

  else if (b < 220 && g > 190) b += 20;

  else {
    g = 189;
    b -= 10;
  }

  $("body").css("background-color", "rgb(" + r + ", " + g + ", " + b + ")");
}
