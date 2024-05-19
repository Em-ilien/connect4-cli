// src/token.js

const { RED, YELLOW } = require("./constants");

class Token {
  constructor(color) {
    this.color = color;
  }

  isYellow() {
    return this.color == YELLOW;
  }

  isRed() {
    return this.color == RED;
  }

  getColor() {
    return this.color;
  }
}

module.exports = Token;
