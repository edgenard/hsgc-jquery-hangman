$().ready(function () {
  if (typeof window.Hangman === "undefined") {
    window.Hangman = {}
  }

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
    "images/hangman-1.png",
    "images/hangman-2.png",
    "images/hangman-3.png",
    "images/hangman-4.png",
    "images/hangman-5.png",
    "images/hangman-6.png",
    "images/hangman-7.png",
  ]

  var secretWord;

  var hangman = window.Hangman;
  hangman.names = $.extend([], NAMES);
  var pickWord = function() {
    var randIndex = Math.floor(Math.random() *(hangman.names.length))
    secretWord = hangman.names[randIndex].toLowerCase().split("")
    hangman.names.splice(randIndex,1)
    return secretWord;
  }
  hangman.setupGame = function () {
    $(".blank-spaces").empty();
    var word = pickWord();
    word.forEach(function (letter, index) {
      $(".blank-spaces").append("<span id=" + index +"></span?")
    })

    $(".letters button").show()
  }

  var findIndexes = function(value, arr) {
    var indexes = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        indexes.push(i)
      }
    }
    return indexes;

  }



  $(".letters button").click(function (event) {
    var letter = $(this)
    var letterString = letter.text().toLowerCase()
    if($.inArray(letterString,secretWord) !== -1){
      var locations = findIndexes(letterString, secretWord)
      $(".blank-spaces").children().each(function (index) {
        if($.inArray(index, locations) !== -1){
          $(this).text(letterString);
        }
      })

    }else{

    }
    letter.hide(700)
  })



})
