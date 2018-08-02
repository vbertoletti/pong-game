import { SVG_NS, KEYS  } from '../settings';
import Board from './Board'; 
import Paddle from './Paddle';


export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
	
		this. gameElement = document.getElementById(this.element);

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
			((this.height - this.paddleHeight) / 2),
			KEYS.a, 
			KEYS.z
		);

		this.player2 = new Paddle (
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			((this.height - this.paddleHeight) / 2),
			KEYS.up, 
			KEYS.down
		);

		console.log(this.player1);
		console.log(this.player2);
		
	}

	render() {

this.gameElement.innerHTML = '';

let svg = document.createElementNS(SVG_NS, "svg");
svg.setAttributeNS(null, "width", this.width);
svg.setAttributeNS(null, "height", this.height);
svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
this.gameElement.appendChild(svg);

//render the board
this.board.render(svg);
//render the paddles
this.player1.render(svg);
this.player2.render(svg);
}

}