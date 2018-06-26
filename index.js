class Alogriphm {
  is(elem, type, message) {
    const errorMessage = message || 'The type of the value or argument does not match!';

    if(type === 'array' && !Array.isArray(elem)) {
      throw new Error(message);
    }

    if(typeof elem !== type) {
      throw new Error(errorMessage);
    }
  }

  reverseWords(string) {
    this.is(string, 'string', 'The argument must be string');

    const stringArr = string.split(' ');

    const reversedWords = [];

    stringArr.forEach(word => {

      const wordArr = word.split('');
      let reversedWord = [];

      wordArr.forEach(char => {
        reversedWord.unshift(char);
      });

      reversedWords.push(reversedWord.join(''));
    });

    return reversedWords.join(' ');
  }

  reverseArrayInPlace(array) {
    this.is(array, 'array', 'The argument must be array');

    for(let i = 0; i < array.length / 2; i++) {
      let tempVar = array[i];
      array[i] = array[array.length - 1 - i];
      array[array.length - 1 - i] = tempVar;
    }
  
    return array;
  }

  fizzBuzz(number) {
    this.is(number, 'number', 'The argument must be number');

    for(let i = 1; i <= number; i++) {
      if(i % 15 === 0) {
        console.log('FizzBuzz');
      } else if(i % 5 === 0) {
        console.log('buzz');
      } else if(i % 3 === 0){
        console.log('fizz');
      } else {
        console.log(i);
      }
    }
  }

}


