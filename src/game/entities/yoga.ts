import { Entity } from "../../engine/entity/index.js";

export class YogaEntity extends Entity {
  constructor (x: number, y: number) {
    super();

    this.x = x;
    this.y = y;

    this.width = 80;
    this.height = 80;
  }

  getType () {
    return "yoga";
  }

  effect () {
    return {
      type: "health",
      amount: 5
    };
  }
}
