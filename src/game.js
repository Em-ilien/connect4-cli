// src/game.js

const Grid = require("./grid");
const EventManager = require("./eventManager");
const StopCondition = require("./stopCondition");
const EventType = require("./eventType");
const { YELLOW, RED } = require("./constants");

class Game {
  constructor() {
    this.grid = new Grid(this);
    this.currentColor = YELLOW;
    this.eventManager = new EventManager();
  }

  getCurrentColor() {
    return this.currentColor;
  }

  getWinner() {
    const stopCondition = new StopCondition(this);
    return stopCondition.getWinner();
  }

  getGrid() {
    return this.grid;
  }

  getEventManager() {
    return this.eventManager;
  }

  updateStatus() {
    if (this.isGameFinished()) {
      this.eventManager.notifyListeners(this, EventType.STOP_GAME);
    } else {
      this.changeCurrentColor();
    }
  }

  changeCurrentColor() {
    this.currentColor = this.currentColor == YELLOW ? RED : YELLOW;
  }

  isGameFinished() {
    return this.getWinner() !== null;
  }
}

module.exports = Game;
