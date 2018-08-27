import { SVG_NS, KEYS } from "../settings";
import Board from "./Board";
import Paddle from "./Paddle";
import Ball from "./Ball";
import Score from "./Score.js";
import Win from "./Win";

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.gameElement = document.getElementById(this.element);

    //make a new board for the game
    this.board = new Board(this.width, this.height);

    //making players
    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;

    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.a,
      KEYS.z,
      "player1"
    );

    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.boardGap - this.paddleWidth,
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down,
      "player2"
    );

    this.score1 = new Score(this.width / 2 - 100, 50, 50);
    this.score2 = new Score(this.width / 2 + 70, 50, 50);
    this.win = new Win(this.width / 2 - 100, 200, 40);

    //make a new ball
    this.ball = new Ball(8, this.width, this.height);
    this.ballSecond = new Ball(10, this.width, this.height);

    //add event listener to listen for space key and pause the game
    document.addEventListener("keydown", event => {
      switch (event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
          break;
      }
    });
  } //end of constructor

  render() {

    if (this.pause) {
      return;
    }
    
    this.gameElement.innerHTML = "";
    //if I trigger pause, return will stop running the code and pause the game.
   

    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);

    this.board.render(svg);
    this.player1.render(svg);
    this.player2.render(svg);

    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);

    this.ball.render(svg, this.player1, this.player2);
    
    //if statement to add a second ball once score is at 3
    if (this.player1.score == 3 || this.player2.score == 3) {
      return this.ballSecond.render(svg, this.player1, this.player2);
    }

    //if statement to declare a winner
    if (this.player1.score == 10 || this.player2.score == 10) {
      this.win.render(svg);
      this.pause = true;
    }
  }
}
