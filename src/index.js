// src/index.js

const { Command } = require("commander");
const readline = require("readline");
const Game = require("./game");
const EventType = require("./eventType");

const program = new Command();

program.version("1.0.0").description("Connect4 CLI Game");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let game;

function askMove() {
  rl.question(
    `Player (${game.getCurrentColor()}), enter column (1-7): `,
    (answer) => {
      const column = parseInt(answer, 10) - 1;
      if (isNaN(column) || column < 0 || column > 6) {
        console.log("Invalid column. Please enter a number between 1 and 7.");
        askMove();
      } else {
        try {
          game.getGrid().getColumn(column).play();
          game.getGrid().printGrid();
          if (game.getWinner()) {
            console.log(`Player (${game.getWinner()}) wins!`);
            rl.close();
          } else {
            askMove();
          }
        } catch (error) {
          console.log(error.message);
          askMove();
        }
      }
    }
  );
}

program
  .command("start")
  .description("Start a new game")
  .action(() => {
    game = new Game();
    const eventManager = game.getEventManager();

    eventManager.addEventListener(game, EventType.STOP_GAME, {
      execute: () => {
        console.log("Game Over!");
        rl.close();
      },
    });

    game.getGrid().printGrid();
    askMove();
  });

program.parse(process.argv);
