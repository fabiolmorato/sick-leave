import { Entity } from "../../engine/entity/index.js";

export class SidePainEntity extends Entity {
  constructor (x: number, y: number) {
    super();

    this.x = x;
    this.y = y;

    this.width = 90;
    this.height = 77;
  }

  getType () {
    return "side-pain";
  }

  effect () {
    return {
      type: "health",
      amount: -7,
      text: "Crashed your bike into another bike! Side pain -7"
    };
  }
}
