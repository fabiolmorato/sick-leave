import { IEntityRenderer, IEntityRendererOptions } from "../../engine/protocols/entity-renderer.js";
import { IRenderer } from "../../engine/protocols/renderer.js";

import { YogaEntity } from "../entities/yoga.js";

import { yoga } from "../images/yoga.js";

export class YogaRenderer implements IEntityRenderer<YogaEntity> {
  render (renderer: IRenderer, entity: YogaEntity, options?: IEntityRendererOptions): void {
    const x = entity.getX() + (options?.translate?.x || 0);
    const y = entity.getY() + (options?.translate?.y || 0);

    renderer.drawImage(yoga, x, y, entity.getWidth(), entity.getHeight());
  }
}
