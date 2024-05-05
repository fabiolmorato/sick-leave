import { IElement } from "../protocols/element.js";
import { EventEmitter } from "../utils/event-emitter.js";

export abstract class Entity extends EventEmitter {
  protected x: number = 0;
  protected y: number = 0;
  protected width: number = 0;
  protected height: number = 0;
  protected collidable = true;
  protected deleteAt: number = Infinity;

  public abstract getType (): string;
  public tick () {}

  public getX () {
    return this.x;
  }

  public getY () {
    return this.y;
  }

  public getWidth () {
    return this.width;
  }

  public getHeight () {
    return this.height;
  }

  public isCollidable () {
    return this.collidable;
  }

  public isColliding (render: Entity | IElement) {
    return render instanceof Entity ? this.isCollidingWithEntity(render) : this.isCollidingWithElement(render);
  }

  private isCollidingWithEntity (entity: Entity) {
    return (
      this.isCollidable() &&
      entity.isCollidable() && 
      this.x + this.width >= entity.getX() &&
      this.x <= entity.getX() + entity.getWidth() &&
      this.y + this.height >= entity.getY() &&
      this.y <= entity.getY() + entity.getHeight()
    );
  }

  private isCollidingWithElement (element: IElement) {
    return (
      this.isCollidable() &&
      this.x + this.width >= element.x &&
      this.x <= element.x + (element.width as number) &&
      this.y + this.height >= element.y &&
      this.y <= element.y + (element.height as number)
    );
  }

  public getCollisionBox () {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  public setTTL (ttl: number) {
    this.deleteAt = Date.now() + ttl;
  }

  public getDeleteAt () {
    return this.deleteAt;
  }
}
