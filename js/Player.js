export default class Player {
  constructor({
    x,
    y,
    width,
    height,
    velocityX,
    velocityY,
    context,
    canvas,
    gravity,
  }) {
    this.position = { x, y };
    this.width = width;
    this.height = height;
    this.velocity = { x: velocityX, y: velocityY };
    this.context = context; // Store context as a class property
    this.canvas = canvas; //
    this.gravity = gravity;
  }

  get playerBottom() {
    return this.position.y + this.height;
  }

  get playerBottomWithVelocity() {
    return this.position.y + this.height + this.velocity.y;
  }

  get playerRightSide() {
    return this.position.x + this.width;
  }

  get playerLeftSide() {
    return this.position.x;
  }

  draw() {
    this.context.fillStyle = 'red';
    this.context.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.playerBottomWithVelocity <= this.canvas.height) {
      this.velocity.y += this.gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}
