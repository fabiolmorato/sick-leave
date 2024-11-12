import { IEntityRenderer, IEntityRendererOptions } from "../../engine/protocols/entity-renderer.js";
import { IRenderer } from "../../engine/protocols/renderer.js";

import { SidePainEntity } from "../entities/side-pain.js";

import { sidePain } from "../images/side-pain.js";

export class SidePainRenderer implements IEntityRenderer<SidePainEntity> {
  render (renderer: IRenderer, entity: SidePainEntity, options?: IEntityRendererOptions): void {
    const x = entity.getX() + (options?.translate?.x || 0);
    const y = entity.getY() + (options?.translate?.y || 0);

    renderer.drawImage(sidePain, x, y, entity.getWidth(), entity.getHeight());
  }
}
