import { Entity } from "../../engine/entity/index.js";

export class CactusEntity extends Entity {
  constructor (x: number, y: number) {
    super();

    this.x = x;
    this.y = y;

    this.width = 60;
    this.height = 92;
  }

  getType () {
    return "cactus";
  }

  effect () {
    return {
      type: "health",
      amount: -3
    };
  }
}
