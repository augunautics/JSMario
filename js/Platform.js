export default class Platform {
  constructor({ x, y, width, height, context }) {
    this.position = { x, y };
    this.width = width;
    this.height = height;
    this.context = context; // Store context as a class property
  }

  get platformTop() {
    return this.position.y;
  }

  get platformLeft() {
    return this.position.x;
  }

  get platformRight() {
    return this.position.x + this.width;
  }

  draw() {
    this.context.fillStyle = 'blue'; // Use this.context to access the canvas context
    this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
