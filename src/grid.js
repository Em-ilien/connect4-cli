// src/grid.js

const { COLUMNS_NUMBER, ROWS_NUMBER } = require("./constants");
const Column = require("./column");
const chalk = require("chalk");

class Grid {
  constructor(game) {
    this.game = game;
    this.columns = [];
    this.initColumns();
  }

  initColumns() {
    for (let i = 0; i < COLUMNS_NUMBER; i++) {
      this.columns.push(new Column(this.game));
    }
  }

  getColumn(column) {
    if (column >= this.columns.length) {
      throw new RangeError("Index out of bounds");
    }
    return this.columns[column];
  }

  printGrid() {
    for (let row = ROWS_NUMBER - 1; row >= 0; row--) {
      let rowStr = "";
      for (let col = 0; col < COLUMNS_NUMBER; col++) {
        const token = this.getColumn(col).getTokenAtRow(row);
        if (token === null) {
          rowStr += "[ ]";
        } else {
          rowStr += token.isYellow()
            ? chalk.bgYellow.black(" Y ")
            : chalk.bgRed.black(" R ");
        }
      }
      console.log(rowStr);
    }
    console.log(" 1  2  3  4  5  6  7");
    console.log("\n");
  }
}

module.exports = Grid;
