/*
Business object
*/

class business {
  constructor(id, name, maxCap) {
    this.id = id;
    this.name = name;
    this.maxCap = maxCap;
  }

  setInfo() {
    // firebase opslag hier via uid
    this.name = 'Fons';
  }
}

export default business;
