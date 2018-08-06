import { SVG_NS } from "../settings";

export default class Win {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.explosion = new Audio("public/sounds/pong-04.wav");
  }

  render(svg) {
    let text = document.createElementNS(SVG_NS, "text");
    text.setAttributeNS(null, "x", this.x);
    text.setAttributeNS(null, "y", this.y);
    text.setAttributeNS(null, "font-family", '"Silkscreen Web", monotype');
    text.setAttributeNS(null, "font-size", this.size);
    text.setAttributeNS(null, "fill", "#22264b");
    text.textContent = "You win!";

    this.explosion.play();
    svg.appendChild(text);
  }
}
