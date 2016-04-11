$().ready(function () {





  var welcomeWord = "ClickPlayaword";

  var setupGame = function () {
    resetImages()
    $(".blank-spaces").empty(); //This empties out all the elements in the .blank-spaces section
    var word = pickWord();// Picks a word from secret list of possible words
    word.forEach(function (letter, index) {
      $(".blank-spaces").append("<span id=" + index +"></span?")
    })// This creates the blank spaces for the world.

    $(".letters button").show()
    $(".letters button").click(letterGuess)
    $(".game-messages p").text("There are " + possibleWords.length + " more words to play.")
    $(".hangman-image img").replaceWith("<img src='http://i.imgur.com/O5KepLs.png' alt='hangman image'>")
  }

  var resetGame = function () {
    resetImages()
    possibleWords = $.extend([], NAMES);
    $(".blank-spaces").empty()
    welcomeWord.split("").forEach(function (letter) {
      $(".blank-spaces").append("<span>" + letter + "</span?")
    })
    $(".game-messages p").text("Welcome to HSGC JQuery Hangman. Click \"Play a Word\" to start playing!")

    $(".hangman-image img").replaceWith("<img src='http://i.imgur.com/O5KepLs.png' alt='hangman image'>")

  }


var letterGuess = function (event) {
    var letter = $(this).text().toLowerCase();

    if(letterInWord(letter)){ // If the person picked the right letter
      fillInBlanks(letter) //fill In the blank spaces with the letter
    if(winner()){//Check if they've won
      $(".letters button").off("click")
      $(".game-messages p").text("You Won! Click Play a Word to play again")
    }
    }else{
      if(imageIndex < 6){//Check if they have more chances
        $(".hangman-image figure img").replaceWith("<img src=" + IMAGES[imageIndex] +" alt='hangman image'>")
        imageIndex += 1;
      } else {
        $(".hangman-image figure img").replaceWith("<img src=" + IMAGES[imageIndex] +" alt='hangman image'>")
        $(".game-messages p").text("Game Over. Click Play Word to play again")
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
  $(".play").click(setupGame)

  $(".reset").click(resetGame)

})
