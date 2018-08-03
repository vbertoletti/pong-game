import { SVG_NS } from '../settings';

export default class Ball {

  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;

    this.reset();
  }

  //reset ball to the middle after player scores goal 
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
  }

  //loop runs 60 times a second 
  render(svg) {

    let circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y );
    circle.setAttributeNS(null, 'fill', 'white');
    circle.setAttributeNS(null, 'r', this.radius);

    svg.appendChild(circle);

  }


}