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
  "http://i.imgur.com/WvCmM8b.png",
  "http://i.imgur.com/r9Zy7yN.png",
  "http://i.imgur.com/ZjkBARC.png",
  "http://i.imgur.com/gFTW0Ta.png",
  "http://i.imgur.com/j5o8met.png",
  "http://i.imgur.com/ma29Fvx.png",
  "http://i.imgur.com/s9QC4RI.png",
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
