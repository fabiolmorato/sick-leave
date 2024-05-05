import { Entity } from "../../engine/entity/index.js";

export class PlayerEntity extends Entity {
  private direction: "left" | "right" | "none" = "right";
  private ticks = 0;
  private realGameTicks = 0;

  private velocityX = 0;
  private velocityY = 0;
  private accelerationY = 2;
  private terminalVelocityY = 35;

  constructor (startX: number, startY: number) {
    super();

    this.x = startX;
    this.y = startY;

    this.velocityX = 0;
    this.velocityY = 0;
    this.accelerationY = 1.5;
    
    this.width = 68;
    this.height = 113;
  }

  getType () {
    return "player";
  }

  tick () {
    super.tick();
    this.realGameTicks++;

    if (this.realGameTicks % 6 === 0) {
      if (this.direction !== "none") this.ticks++;
      else this.ticks = 0;
    }

    if (this.ticks > 8) this.ticks = 0;

    this.x += this.velocityX;
    this.y += this.velocityY;
    this.velocityY = Math.min(this.velocityY + this.accelerationY, this.terminalVelocityY);
  }

  public reset () {
    this.x = 0;
    this.y = 0;

    this.velocityX = 0;
    this.velocityY = 0;
    this.accelerationY = 0;
  }

  public left () {
    this.velocityX = -12;
    this.direction = "left";
  }

  public right () {
    this.velocityX = 12;
    this.direction = "right";
  }

  public jump () {
    this.accelerationY = 1.5;
    this.velocityY = -28;
  }

  public floorHit () {
    this.accelerationY = 0;
    this.velocityY = 0;
  }

  public correctPosition (x: number, y: number) {
    this.x = x;
    this.y = y;

    this.velocityX = 0;
    this.velocityY = 0;
  }

  public stop () {
    this.direction = "none";
    this.velocityX = 0;
  }

  public getDirection () {
    return this.direction;
  }

  public getTicks () {
    return this.ticks % 9;
  }
}
