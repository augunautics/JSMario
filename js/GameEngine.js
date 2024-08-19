export default class GameEngine {
  constructor({ player, platforms, context, inputState, canvas }) {
    this.player = player;
    this.platforms = platforms;
    this.context = context;
    this.inputState = inputState;
    this.canvas = canvas;

    this.animate = this.animate.bind(this);
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.platforms.forEach((platform) => {
      this.handlePlayerMovement(platform);
      this.handlePlatformMovement(platform);
      this.handleCollisionDetection(platform);

      platform.draw();
    });

    this.player.update();
  }

  get isRightPressed() {
    return this.inputState.right.pressed;
  }

  get isLeftPressed() {
    return this.inputState.left.pressed;
  }

  get playerRightEdge() {
    return this.player.position.x + this.player.width;
  }

  get playerLeftEdge() {
    return this.player.position.x;
  }

  setPlayerHorizontalVelocity(value) {
    this.player.velocity.x = value;
  }

  setPlayerVerticalVelocity(value) {
    this.player.velocity.y = value;
  }

  handlePlayerMovement(platform) {
    if (this.isRightPressed && this.playerLeftEdge < 400) {
      this.setPlayerHorizontalVelocity(5);
    } else if (this.isLeftPressed && this.playerLeftEdge > 100) {
      this.setPlayerHorizontalVelocity(-5);
    } else {
      this.setPlayerHorizontalVelocity(0);
    }
  }

  handlePlatformMovement(platform) {
    if (this.isRightPressed && this.player.velocity.x === 0) {
      platform.position.x -= 5;
    } else if (this.isLeftPressed && this.player.velocity.x === 0) {
      platform.position.x += 5;
    }
  }

  handleCollisionDetection(platform) {
    if (
      this.player.playerBottom <= platform.platformTop &&
      this.player.playerBottomWithVelocity >= platform.platformTop &&
      this.playerRightEdge >= platform.platformLeft &&
      this.player.position.x <= platform.platformRight
    ) {
      this.setPlayerVerticalVelocity(0);
    }
  }
}
