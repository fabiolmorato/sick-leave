import { IEntityRenderer, IEntityRendererOptions } from "../../engine/protocols/entity-renderer.js";
import { IRenderer } from "../../engine/protocols/renderer.js";

import { PlayerEntity } from "../entities/player.js";

import { stickFigure } from "../images/stick-figure.js";

export class PlayerEntityRenderer implements IEntityRenderer<PlayerEntity> {
  render (renderer: IRenderer, entity: PlayerEntity, options?: IEntityRendererOptions): void {
    const direction = entity.getDirection();
    const tick = entity.getTicks();
    const spritePosition = direction === "left" ? (8 - tick) : direction === "right" ? tick : 0;

    const x = entity.getX() + (options?.translate?.x || 0);
    const y = entity.getY() + (options?.translate?.y || 0);

    renderer.drawImage(stickFigure, x, y, 72, 113, {
      startX: 79 * spritePosition + 15,
      startY: direction === "left" ? 22 : 174,
      width: 72,
      height: 113
    });
  }
}
