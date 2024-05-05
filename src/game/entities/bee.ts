import { Entity } from "../../engine/entity/index.js";

export class BeeEntity extends Entity {
  private velocityX = 0;
  private velocityY = 0;

  constructor (x: number, y: number) {
    super();

    this.x = x;
    this.y = y;

    this.velocityX = -16;
    this.velocityY = 0;

    this.width = 90;
    this.height = 90;

    this.setTTL(6000);
  }

  public tick () {
    super.tick();

    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  getType () {
    return "bee";
  }

  effect () {
    return {
      type: "health",
      amount: -4,
      text: "Got stung by a bee! -4"
    };
  }
}
