import { IEntityRenderer, IEntityRendererOptions } from "../../engine/protocols/entity-renderer.js";
import { IRenderer } from "../../engine/protocols/renderer.js";

import { BeeEntity } from "../entities/bee.js";

import { bee } from "../images/bee.js";

export class BeeRenderer implements IEntityRenderer<BeeEntity> {
  render (renderer: IRenderer, entity: BeeEntity, options?: IEntityRendererOptions): void {
    const x = entity.getX() + (options?.translate?.x || 0);
    const y = entity.getY() + (options?.translate?.y || 0);

    renderer.drawImage(bee, x, y, entity.getWidth(), entity.getHeight());
  }
}
