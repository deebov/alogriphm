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

  isPalindrome(string) {
    this.is(string, 'string');

    const notReversed = string.toLowerCase().replace(/[^\w]/g, '');
    const reversed = string.split('').reverse().join('');

    return notReversed === reversed;
  }

  harmlessRansomNote(noteText, magazineText) {
    this.is(noteText, 'string');
    this.is(magazineText, 'string');

    const noteArr = noteText.split(' ');
    const magazineArr = magazineText.split(' ');
    const magazineObj = {};
    
    magazineArr.forEach(word => {
      if(!magazineObj[word]) magazineObj[word] = 0;
      magazineObj[word]++;
    });

    let noteIsPossible = true;
    noteArr.forEach(word => {
      if(magazineObj[word]) {
        magazineObj[word]--;
        if (magazineObj[word] < 0) {
          noteIsPossible = false;
        }
      }
      else noteIsPossible = false;
    });

    return noteIsPossible;
  }

  sieveOfEratosthenes(position) {
    this.is(position, 'number');

    for (let i = 0; i <= position; i++) {
      primes[i] = true;    
    }
  
    primes[0] = false;
    primes[1] = false;
  
    for(let i = 2; i <= Math.sqrt(position); i++) {
      for(let j = 2; j * i <= position; j++) {
        primes[j * i] = false;
      }
    }
  
    const result = [];
    for(let i = 0; i < primes.length; i++) {
      if(primes[i]) {
        result.push(i);
      }
    }
  
    return result;
  }

  factorial(number, endNumber = 1, numerator = 1) {
    this.is(number, 'number');
    this.is(endNumber, 'number');
    this.is(numerator, 'number');

    if(number <= endNumber) {
      return endNumber;
    } 
    else {
      return number * factorial(number - numerator, endNumber, numerator);
    }
  }

}


