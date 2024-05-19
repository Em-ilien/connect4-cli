// src/eventManager.js

const EventType = require("./eventType");

class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  addEventListener(game, eventType, executable) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(executable);
  }

  notifyListeners(game, eventType) {
    const listeners = this.listeners.get(eventType);
    if (!listeners) return;

    listeners.forEach((executable) => executable.execute());
  }
}

module.exports = EventManager;
