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

    //initial position of the ball
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    //make movement happen 
    //while loop so the random # is never zero stuck in the middle, the value is between 10 and -5
    this.vy = 0;
    while(this.vy === 0){
      this.vy = this.vy = Math.floor(Math.random() * 10 - 5);
    }
    //
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;
    if(hitLeft || hitRight){
      this.vx = -this.vx; //or * -1 cause I want the vector to move the oppositve direction 
    } else if(hitTop || hitBottom){
      this.vy = -this.vy;
    }
  }

  paddleCollision(player1, player2) {
    //if moving toward the right end..
    if (this.vx > 0) {
      //detect player2 collision
      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
      let[leftX, rightX, topY, bottomY] = paddle;

      if(
      (this.x + this.radius >= leftX) && 
      (this.x + this.radius <= rightX) &&
      (this.y >= topY && this.y <= bottomY)
      ){ 
        this.vx = -this.vx; 
      }
    } else {
      //player 1 paddle collision
      let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
      let[leftX, rightX, topY, bottomY] = paddle;
      if (
        (this.x - this.radius <= rightX) &&
        (this.x - this.radius >= leftX) &&
        (this.y >= topY && this.y <= bottomY)
      ){
        this.vx = -this.vx;
      } 
    }
  }

  //loop runs 60 times a second 
  render(svg, player1, player2) {

    //adding vectors on each frame
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();
    this.paddleCollision(player1, player2);

    //draw ball 
    let circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y );
    circle.setAttributeNS(null, 'fill', 'white');
    circle.setAttributeNS(null, 'r', this.radius);

    svg.appendChild(circle);

  }


}