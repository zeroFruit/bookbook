var wordBox;
const NUMBER_OF_WORDS = 3;

class WordBox {
  constructor(allWords) {
    this.selectedWords = [];
    console.log('constructor', allWords);
    this.allWords = allWords;
  }

  addWord(word) {
    this.selectedWords.push(word);
  }

  removeWord(word) {
    this.selectedWords = this.selectedWords.filter(function(w) {
      if (w[0] === word[0]) {
        return false;
      } else {
        return true;
      }
    })
  }

  getWords() {
    return this.selectedWords;
  }

  getWordsLength() {
    return this.selectedWords.length;
  }

  getWordsWithBid() {
    var allWords = this.allWords;

    var result = this.selectedWords.map(function(word) {
      for (var i = 0; i < allWords.length; i++) {
        if(word[0] === allWords[i][0]) {
          return allWords[i];
        }
      }
    });

    return result;
  }
}



const initWordCloud = function (list) {
  wordBox = new WordBox(list);

  list = list.map(function(elt) {
    return [elt[0], elt[1]];
  });

  var options = {
    list: list,
    gridSize: 50,
    classes: 'content',
    weightFactor: 3,
    fontFamily: 'Finger Paint, cursive, sans-serif',
    color: '#000000',
    hover: wcHoverListener,
    click: wcClickListener,
    backgroundColor: '#DADADA'
  };

  /* 워드 클라우드를 만듭니다. */
  WordCloud($('#wordcloud')[0], options);
}


const wcClickListener = function (word, dimension, event) {
  var $target = $(event.target);

  if ($target.hasClass('selected')) {
    $target
      .css('color', '#000000')
      .removeClass('selected');

    wordBox.removeWord(word);
  } else {
    $target
      .css('color', '#123456')
      .addClass('selected');

    wordBox.addWord(word);
  }

  console.log(wordBox.getWords());

  if (wordBox.getWordsLength() >= NUMBER_OF_WORDS) {
    wordsAreReady(wordBox.getWords());
  } else {
    wordsAreNotReady();
  }
}

const wcHoverListener = function (item, dimension, event) {

}

/*
  helper
*/
const wordsAreReady = function (words) {
  $('#rec-btn').addClass('haswords');
  localStorage.setItem('words', JSON.stringify(wordBox.getWordsWithBid()));
  console.log('READY');
}

const wordsAreNotReady = function () {
  $('#rec-btn').removeClass('haswords');
  localStorage.setItem('words', null);
  console.log('NOT READY');
}
