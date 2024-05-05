import { IEntityRenderer, IEntityRendererOptions } from "../../engine/protocols/entity-renderer.js";
import { IRenderer } from "../../engine/protocols/renderer.js";

import { VitaminPillEntity } from "../entities/vitamin-pill.js";

import { vitaminPill } from "../images/vitamin-pill.js";

export class VitaminPillRenderer implements IEntityRenderer<VitaminPillEntity> {
  render (renderer: IRenderer, entity: VitaminPillEntity, options?: IEntityRendererOptions): void {
    const x = entity.getX() + (options?.translate?.x || 0);
    const y = entity.getY() + (options?.translate?.y || 0);

    renderer.drawImage(vitaminPill, x, y, entity.getWidth(), entity.getHeight());
  }
}
