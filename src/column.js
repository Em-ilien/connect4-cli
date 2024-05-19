// src/column.js

const Token = require("./token");
const Grid = require("./grid");
const { ROWS_NUMBER } = require("./constants");

class Column {
  constructor(game) {
    this.game = game;
    this.tokens = [];
  }

  play() {
    if (!this.canPlay()) {
      throw new Error("Cannot play in this column");
    }
    this.tokens.push(new Token(this.game.getCurrentColor()));
    this.game.updateStatus();
  }

  canPlay() {
    return this.tokens.length + 1 <= ROWS_NUMBER;
  }

  getTokenAtRow(row) {
    if (row >= this.tokens.length) {
      return null;
    }
    return this.tokens[row];
  }

  isTokenPlayed(row) {
    return this.getTokenAtRow(row) !== null;
  }
}

module.exports = Column;
