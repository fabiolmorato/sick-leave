import { IEntityRenderer, IEntityRendererOptions } from "../../engine/protocols/entity-renderer.js";
import { IRenderer } from "../../engine/protocols/renderer.js";

import { CactusEntity } from "../entities/cactus.js";

import { cactus } from "../images/cactus.js";

export class CactusRenderer implements IEntityRenderer<CactusEntity> {
  render (renderer: IRenderer, entity: CactusEntity, options?: IEntityRendererOptions): void {
    const x = entity.getX() + (options?.translate?.x || 0);
    const y = entity.getY() + (options?.translate?.y || 0);

    renderer.drawImage(cactus, x, y, entity.getWidth(), entity.getHeight());
  }
}
