import { Entity } from "../../engine/entity/index.js";

export class VitaminPillEntity extends Entity {
  private velocityX = 0;
  private velocityY = 0;

  private accelerationX = 0.25;
  private accelerationY = 1.5;

  constructor (x: number, y: number) {
    super();

    this.x = x;
    this.y = y;

    this.velocityX = -12;
    this.velocityY = -12;

    this.accelerationX = 0.25;
    this.accelerationY = 1.5;

    this.width = 90;
    this.height = 45;

    this.setTTL(12000);
  }

  public tick () {
    super.tick();

    this.x += this.velocityX;
    this.y += this.velocityY;

    this.velocityX = Math.min(this.velocityX + this.accelerationX, 0);
    this.velocityY = Math.min(this.velocityY + this.accelerationY, 28);
  }

  public hitLeft (x: number) {
    this.velocityX = 0;
    this.x = x;
  }

  public hitFloor (y: number) {
    this.velocityY = 0;
    this.y = y - this.height;
  }

  getType () {
    return "vitamin-pill";
  }

  effect () {
    return {
      type: "health",
      amount: 10,
      text: "Took a vitamin pill! +10"
    };
  }
}
