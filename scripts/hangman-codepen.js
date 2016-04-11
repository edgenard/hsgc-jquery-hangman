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
  var imageIndex = 0;

  var hangman = window.Hangman;

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
    var randIndex = Math.floor(Math.random() *(hangman.names.length))
    secretWord = hangman.names[randIndex].toLowerCase().split("")
    hangman.names.splice(randIndex,1)
    return secretWord;
  }



  hangman.names = $.extend([], NAMES);

  //Setup Intro UI
  $(".number-of-names p").text("There are " + hangman.names.length + " more words to play.")

  var welcomeWord = "ClickPlayaword";

  hangman.setupGame = function () {
    $(".blank-spaces").empty();
    var word = pickWord();
    word.forEach(function (letter, index) {
      $(".blank-spaces").append("<span id=" + index +"></span?")
    })

    $(".letters button").show()
    $(".letters button").click(letterGuess)
    $(".number-of-names p").text("There are " + hangman.names.length + " more words to play.")
    $(".hangman-image img").replaceWith("<img src='images/welcome-hangman.png' alt='hangman image'>")
  }

  hangman.resetGame = function () {
    hangman.names = $.extend([], NAMES);
    $(".blank-spaces").empty()
    welcomeWord.split("").forEach(function (letter) {
      $(".blank-spaces").append("<span>" + letter + "</span?")
    })
    $(".number-of-names p").text("There are " + hangman.names.length + " more words to play.")

    $(".hangman-image img").replaceWith("<img src='images/welcome-hangman.png' alt='hangman image'>")

  }


var letterGuess = function (event) {
    var letter = $(this).text().toLowerCase();
    if($.inArray(letter,secretWord) !== -1){ // If the person picked the right letter.
      var locations = findIndexes(letter, secretWord)
      $(".blank-spaces").children().each(function (index) {
        if($.inArray(index, locations) !== -1){
          $(this).text(letter);
        }
      })

    }else{
      if(imageIndex < 6){
        $(".hangman-image figure img").replaceWith("<img src=" + IMAGES[imageIndex] +" alt='hangman image'>")
        imageIndex += 1;
      } else {
        $(".hangman-image figure img").replaceWith("<img src=" + IMAGES[imageIndex] +" alt='hangman image'>")
        $(".number-of-names p").text("Game Over. Click Play Word to play again")
        $(".letters button").off("click")
        revealWord()
      }

    }
    $(this).hide(700)
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
  $(".play").click(hangman.setupGame)

  $(".reset").click(hangman.resetGame)




})
