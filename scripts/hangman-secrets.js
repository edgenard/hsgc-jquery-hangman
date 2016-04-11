var NAMES = [
  "Emmanuella",
  "Dishelle",
  "Patience",
  "Travis",
  "Jemar",
  "Tia",
  "Garyl",
  "Mohamed",
  "Maximillian",
  "Zaire",
  "Araceli",
  "Ashley",
  "Trevon"
]

var IMAGES = [
  "https://cdn.rawgit.com/edgenard/hsgc-jquery-hangman/master/images/hangman-1.png",
  "https://cdn.rawgit.com/edgenard/hsgc-jquery-hangman/master/images/hangman-2.png",
  "https://cdn.rawgit.com/edgenard/hsgc-jquery-hangman/master/images/hangman-3.png",
  "https://cdn.rawgit.com/edgenard/hsgc-jquery-hangman/master/images/hangman-4.png",
  "https://cdn.rawgit.com/edgenard/hsgc-jquery-hangman/master/images/hangman-5.png",
  "https://cdn.rawgit.com/edgenard/hsgc-jquery-hangman/master/images/hangman-6.png",
  "https://cdn.rawgit.com/edgenard/hsgc-jquery-hangman/master/images/hangman-7.png",
]


var secretWord;
var imageIndex = 0;

var findIndexes = function(value, arr) {
  var indexes = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      indexes.push(i)
    }
  }
  return indexes;

}


var pickWord = function() {
  var randIndex = Math.floor(Math.random() *(possibleWords.length))
  secretWord = possibleWords[randIndex].toLowerCase().split("")
  possibleWords.splice(randIndex,1)
  return secretWord;
}


var possibleWords = $.extend([], NAMES)
var welcomeWord = "ClickPlayaword";

var resetImages = function () {
  imageIndex = 0;
}

var resetPossibleWords = function () {
  possibleWords = $.extend([], NAMES)
}

var makeBlankSpaces = function (word) {
  word.forEach(function (letter, index) {
    $(".blank-spaces").append("<span id=" + index +"></span?")
  })
}

var fillInWelcomeWord = function () {
  welcomeWord.split("").forEach(function (letter) {
    $(".blank-spaces").append("<span>" + letter + "</span?")
  })
}

var letterInWord = function (letter) {
  if($.inArray(letter, secretWord)!== -1){
    return true;
  }else{
    return false;
  }
}

var fillInBlanks = function (letter) {
  var locations = findIndexes(letter, secretWord)
  $(".blank-spaces").children().each(function (index) {
    if($.inArray(index, locations) !== -1){
      $(this).text(letter);
    }
  })
}

var winner = function () {
  return !$(".blank-spaces span").is(":empty")
}

var revealWord = function () {
  secretWord.forEach(function (letter, index) {
    $(".blank-spaces span").each(function () {
      if ($(this).attr("id") === "" + index) {
        $(this).text(letter)
      }
    })
  })
}

var showNextImage = function () {
  $(".hangman-image figure img").replaceWith("<img src=" + IMAGES[imageIndex] +" alt='hangman image'>")
  imageIndex += 1;
}

var gameOver = function () {
  return imageIndex >= 6;
}
