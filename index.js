class isTrue {
  constructor(obj = {}) {
    this.info = {
      log: obj.hasOwnProperty('log') ? obj.log : 'throw error', 
      message: obj.hasOwnProperty('message') ? obj.message : 'The value is not match'
    };
  }

  is(target, type, message, logType) {
    let result;
    message = message || this.info.message;
    logType = logType !== undefined ? logType : this.info.log;

    switch (type) {
      case 'array':
        result = this.isArray(target);
        break;
      case 'object':
        result = this.isObject(target);
        break;
      case 'string':
        result = this.isString(target);
        break;
      case 'number':
        result = this.isNumber(target);
        break;
      case 'empty':
        result = this.isEmpty(target);
        break;
      case 'boolean':
        result = this.isBoolean(target);
        break;
      case 'equal':
        if(this.isArray(target)) {
          if (target.length < 2 || target.length > 2) {
            this.logger('The length of the target must be 2', 'error')
            return false;
          }
          else {
            result = this.isEqual(target[0], target[1]);
          }
        }
        else {
          this.logger('The target must be an array', 'error')
          return false;
        }
        break;
      // if the type is not specified
      case undefined: 
        try {
          if(this.isObject(target)) {
            let type = target.hasOwnProperty('type') ? target.type : undefined;
            let tg = target.target;
            message = target.message ? target.message : message;
            logType = target.log ? target.log : logType;
            result = this.is(tg, type, '', false)
          }
        }
        catch (err) {
          this.logger(err, 'error')
        }
        break;
      default:
        this.logger('The type is not found', 'error')
        return false;
    }
    if(!result) this.logger(message, logType);
    
    return result;
  }
  
  isObject(object) {
    return !Array.isArray(object) && typeof object === 'object';
  }

  isArray(array) {
    return Array.isArray(array);
  }

  isString(string) {
    return typeof string === 'string';
  }

  isNumber(number) {
    return typeof number === 'number';
  }

  isEqual(elem1, elem2) {
    if(elem1 === elem2 || (elem1 === NaN && elem2 === NaN)) 
      return true;

    if(typeof elem1 !== typeof elem2) 
      return false;
    
    if(this.isObject(elem1) && this.isObject(elem2)) 
      return this.isObjectEqual(elem1, elem2);
    

    if(this.isArray(elem1) && this.isArray(elem2)) 
      return this.isArrayEqual(elem1, elem2);

    return false;
  }

  isObjectEqual(obj1, obj2) {
    // Haha gotcha 😀😀
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  isArrayEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  isEmpty(elem) {
    if(elem.length || Object.keys(elem).length || typeof elem === 'number') 
      return false;
    return true
  }

  isBoolean(elem) {
    return typeof elem === 'boolean';
  }

  toBoolean(elem) {
    return !!elem;
  }

  lengthOfObjects(obj) {
    return Object.keys(obj).length;
  }

  logger(message, type) {
    switch (type) {
      // console.log
      case 'log':
        console.log(message);
        break;
      // console.warn
      case 'warn':
        console.warn(message);
        break;
      // console.info
      case 'info':
        console.info(message);
        break;
      // console.error
      case 'error':
        console.error(message);
        break;
      // throw new Error()
      case 'throw error':
        throw new Error(message);
      // default value for this.is
      case false: 
        break;
      // default value
      default:
        console.log(message);
        break;
    }
    return message;
  }
}

class Alogriphm extends isTrue {

  // Reverse  Words
  reverseWords(string) {
    // testing
    this.is(string, 'string', 'The argument must be string');
    // make an array from string
    const stringArr = string.split(' ');
    // result array
    const reversedWords = [];

    stringArr.forEach(word => {

      const wordArr = word.split('');
      let reversedWord = [];
      // make reversed word
      wordArr.forEach(char => {
        reversedWord.unshift(char);
      });

      reversedWords.push(reversedWord.join(''));
    });

    return reversedWords.join(' ');
  }

  // Reverse Array in Place
  reverseArrayInPlace(array) {
    // testing
    this.is(array, 'array', 'The argument must be array');

    for(let i = 0; i < array.length / 2; i++) {
      // save current element 
      let tempVar = array[i];
      // change current element to array[array.length - 1 - i]
      array[i] = array[array.length - 1 - i];
      // save current element instead array[array.length - 1 - i]
      array[array.length - 1 - i] = tempVar;
    }
  
    return array;
  }

  // Fizz Buzz
  fizzBuzz(number) {
    // testing
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

  // is Palindrome
  isPalindrome(string) {
    // testing
    this.is(string, 'string');

    // string to lowercase and replace all unnecessary characters to empty string
    const notReversed = string.toLowerCase().replace(/[^\w]/g, '');
    const reversed = string.split('').reverse().join('');

    // compare not the reversed string and the reversed string
    return notReversed === reversed;
  }

  // Harmless Ransom Note
  harmlessRansomNote(noteText, magazineText) {
    // testing
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

  // Sieve of Eratosthenes
  sieveOfEratosthenes(position) {
    // testing
    this.is(position, 'number');

    const primes = [];

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

  // Factorial
  factorial(number, endNumber = 1, numerator = 1) {
    // it is not recommended to change the endNumber value and the numerator value, but if you are curious then you're welcome

    // testing
    this.is([number, endNumber, numerator], 'number');

    if(number <= endNumber) {
      return endNumber;
    } 
    else {
      return number * this.factorial(number - numerator, endNumber, numerator);
    }
  }

  // Fibonacci
  fibonacci(position) {
    // testing
    this.is(position, 'number');

    if(position < 3) {
      return 1;
    }
    else {
      return this.fibonacci(position - 1) + this.fibonacci(position - 2);
    }
  }

  // Memoized Fibonacci
  fibMemo(index, cache = []) {
    // testing
    this.is(index, 'number');
    this.is(cache, 'array');

    // cache checking for the presence of an index
    if(cache[index]) {
      return cache[index];
    }
    else {
      if (index < 3) {
        return 1;
      }
      else {
        cache[index] = this.fibMemo(index - 1, cache) + this.fibMemo(index - 2, cache);
      }
    }
    
    return cache[index];
  }

  // Ceaser Cipher
  ceaserCipher(string, number) {
    // testing
    this.is(string, 'string');
    this.is(number, 'number');

    const lowerCaseText = string.toLowerCase();
    const textArr = lowerCaseText.split('');
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    number = number % alphabet.length;

    const secret = [];
    textArr.forEach((char, idx) => {

      const index = alphabet.indexOf(char);
      let newIndex = index + number;

      if(index > -1) {
        if(newIndex > alphabet.length - 1) {
          newIndex = newIndex - alphabet.length;
        }
        if(newIndex < 0) {
          newIndex = newIndex + alphabet.length;
        }
        if(text[idx] === text[idx].toUpperCase()) {
          secret.push(alphabet[newIndex].toUpperCase());
        }
        else {
          secret.push(alphabet[newIndex]);
        }
        
      }
      else {
        secret.push(char);
      }
    });

    return secret.join('');
  }

  // Two Sum
  twoSum(array, sum, timeComplexity = 'n') {
    // testing
    this.is([array], 'array');
    this.is(sum, 'number');
    this.is(timeComplexity, 'string');

    const pairs = [];

    // O(n^2) version
    if (timeComplexity === 'n^2') {
      for(let i = 0; i < array.length; i++) {
        for(let j = i + 1; j < array.length; j++) {
          if(array[i] + array[j] === sum) {
            pairs.push([array[i], array[j]]);
          }
        }
      }
    } 
    // O(n) version and default
    else if(timeComplexity === 'n') {
      const hashtable = [];
      
      for(let i = 0; i < array.length; i++) {
        let currNum = array[i];
        let counterpart = sum - currNum;
        if(hashtable.indexOf(counterpart) !== -1) {
          pairs.push([currNum, counterpart]);
        }
        hashtable.push(currNum);
      }
    }
    
    return pairs;
  }
}


const alogriphm = new Alogriphm();
