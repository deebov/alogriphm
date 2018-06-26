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
}


