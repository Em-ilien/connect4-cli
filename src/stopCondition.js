// src/stopCondition.js

const Grid = require("./grid");
const {
  COLUMNS_NUMBER,
  ROWS_NUMBER,
  REQUIRED_ALIGNED_TOKENS_TO_WIN,
  MIDDLE_ROW,
  MIDDLE_COLUMN,
} = require("./constants");

class StopCondition {
  constructor(game) {
    this.grid = game.getGrid();
  }

  getWinner() {
    let color = null;

    color = this.checkIfWinnerOnHorizontalLines();
    if (color) return color;

    color = this.checkIfWinnerOnVerticalLines();
    if (color) return color;

    color = this.checkIfWinnerOnDiagonalLeftToRight();
    if (color) return color;

    color = this.checkIfWinnerOnDiagonalRightToLeft();
    if (color) return color;

    return null;
  }

  checkIfWinnerOnHorizontalLines() {
    for (let i = 0; i < ROWS_NUMBER; i++) {
      if (this.grid.getColumn(MIDDLE_COLUMN).getTokenAtRow(i) === null)
        continue;
      const color = this.grid
        .getColumn(MIDDLE_COLUMN)
        .getTokenAtRow(i)
        .getColor();

      const coloredCell = [];
      coloredCell.push(MIDDLE_COLUMN);
      coloredCell.push(...this.fetchTokenWithSameColorInRow(i, color, true));
      coloredCell.push(...this.fetchTokenWithSameColorInRow(i, color, false));

      if (coloredCell.length >= REQUIRED_ALIGNED_TOKENS_TO_WIN) return color;
    }
    return null;
  }

  fetchTokenWithSameColorInRow(row, color, checkLeftColumns) {
    const coloredCell = [];
    let column = MIDDLE_COLUMN;
    do {
      column = checkLeftColumns ? column - 1 : column + 1;
      const token = this.grid.getColumn(column).getTokenAtRow(row);
      if (!token || token.getColor() !== color) break;
      coloredCell.push(column);
    } while (
      Math.abs(MIDDLE_COLUMN - column) <
      REQUIRED_ALIGNED_TOKENS_TO_WIN - 1
    );
    return coloredCell;
  }

  checkIfWinnerOnVerticalLines() {
    for (let i = 0; i < COLUMNS_NUMBER; i++) {
      if (this.grid.getColumn(i).getTokenAtRow(MIDDLE_ROW) === null) continue;
      const color = this.grid.getColumn(i).getTokenAtRow(MIDDLE_ROW).getColor();

      const coloredCell = [];
      coloredCell.push(MIDDLE_ROW);
      coloredCell.push(...this.fetchTokenWithSameColorInColumn(i, color, true));
      coloredCell.push(
        ...this.fetchTokenWithSameColorInColumn(i, color, false)
      );

      if (coloredCell.length >= REQUIRED_ALIGNED_TOKENS_TO_WIN) return color;
    }
    return null;
  }

  fetchTokenWithSameColorInColumn(column, color, checkBottomRows) {
    const coloredCell = [];
    let row = MIDDLE_ROW;
    do {
      row = checkBottomRows ? row - 1 : row + 1;
      const token = this.grid.getColumn(column).getTokenAtRow(row);
      if (!token || token.getColor() !== color) break;
      coloredCell.push(row);
    } while (
      Math.abs(StopCondition.MIDDLE_ROW - row) <
      REQUIRED_ALIGNED_TOKENS_TO_WIN - 1
    );
    return coloredCell;
  }

  checkIfWinnerOnDiagonalLeftToRight() {
    for (let i = 0; i < ROWS_NUMBER; i++) {
      for (let j = 0; j < COLUMNS_NUMBER; j++) {
        if (this.grid.getColumn(j).getTokenAtRow(i) === null) continue;
        const color = this.grid.getColumn(j).getTokenAtRow(i).getColor();

        if (
          this.checkDiagonalLeftToRight(i, j, color, 1) >=
          REQUIRED_ALIGNED_TOKENS_TO_WIN
        )
          return color;
      }
    }
    return null;
  }

  checkIfWinnerOnDiagonalRightToLeft() {
    for (let i = 0; i < ROWS_NUMBER; i++) {
      for (let j = 0; j < COLUMNS_NUMBER; j++) {
        if (this.grid.getColumn(j).getTokenAtRow(i) === null) continue;
        const color = this.grid.getColumn(j).getTokenAtRow(i).getColor();

        if (
          this.checkDiagonalRightToLeft(i, j, color, 1) >=
          REQUIRED_ALIGNED_TOKENS_TO_WIN
        )
          return color;
      }
    }
    return null;
  }

  checkDiagonalLeftToRight(row, column, color, count) {
    if (row >= ROWS_NUMBER - 1 || column >= COLUMNS_NUMBER - 1) return count;

    const token = this.grid.getColumn(column + 1).getTokenAtRow(row + 1);
    if (!token || token.getColor() !== color) return count;

    return this.checkDiagonalLeftToRight(row + 1, column + 1, color, count + 1);
  }

  checkDiagonalRightToLeft(row, column, color, count) {
    if (row >= ROWS_NUMBER - 1 || column <= 0) return count;

    const token = this.grid.getColumn(column - 1).getTokenAtRow(row + 1);
    if (!token || token.getColor() !== color) return count;

    return this.checkDiagonalRightToLeft(row + 1, column - 1, color, count + 1);
  }
}

module.exports = StopCondition;
