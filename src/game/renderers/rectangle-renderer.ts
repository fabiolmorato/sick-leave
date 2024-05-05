import { IElement } from "../../engine/protocols/element.js";
import { IElementRenderer, IElementRendererOptions } from "../../engine/protocols/element-renderer.js";
import { IRenderer } from "../../engine/protocols/renderer.js";

export class RectangleRenderer implements IElementRenderer {
  render (renderer: IRenderer, element: IElement, options?: IElementRendererOptions): void {
    if (element.height === undefined || element.width === undefined) {
      throw new Error("Rectangle element must have a width and a height");
    }
    
    const x = element.x + (options?.translate?.x || 0);
    const y = element.y + (options?.translate?.y || 0);

    renderer.drawRectangle(x, y, element.width, element.height, element.metadata.color, {
      ...element.metadata
    });
  }
}
