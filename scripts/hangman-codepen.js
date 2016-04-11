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
    imageIndex = 0;
    $(".blank-spaces").empty();
    var word = pickWord();
    word.forEach(function (letter, index) {
      $(".blank-spaces").append("<span id=" + index +"></span?")
    })

    $(".letters button").show()
    $(".letters button").click(letterGuess)
    $(".number-of-names p").text("There are " + hangman.names.length + " more words to play.")
    $(".hangman-image img").replaceWith("<img src='http://i.imgur.com/O5KepLs.png' alt='hangman image'>")
  }

  hangman.resetGame = function () {
    imageIndex = 0;
    hangman.names = $.extend([], NAMES);
    $(".blank-spaces").empty()
    welcomeWord.split("").forEach(function (letter) {
      $(".blank-spaces").append("<span>" + letter + "</span?")
    })
    $(".number-of-names p").text("There are " + hangman.names.length + " more words to play.")

    $(".hangman-image img").replaceWith("<img src='http://i.imgur.com/O5KepLs.png' alt='hangman image'>")

  }


var letterGuess = function (event) {
    var letter = $(this).text().toLowerCase();

    if(letterInWord(letter)){ // If the person picked the right letter
      fillInBlanks(letter) //fill In the blank spaces with the letter
    if(winner()){//Check if they've won
      $(".letters button").off("click")
      $(".number-of-names p").text("You Won! Click Play a Word to play again")
    }
    }else{
      if(imageIndex < 6){//Check if they have more chances
        $(".hangman-image figure img").replaceWith("<img src=" + IMAGES[imageIndex] +" alt='hangman image'>")
        imageIndex += 1;
      } else {
        $(".hangman-image figure img").replaceWith("<img src=" + IMAGES[imageIndex] +" alt='hangman image'>")
        $(".number-of-names p").text("Game Over. Click Play Word to play again")
        $(".letters button").off("click")
        revealWord()
      }

    }
    $(this).hide(500)

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
  $(".play").click(hangman.setupGame)

  $(".reset").click(hangman.resetGame)

})
