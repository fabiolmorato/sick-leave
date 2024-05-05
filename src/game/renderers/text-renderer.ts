import { IElement } from "../../engine/protocols/element.js";
import { IElementRenderer, IElementRendererOptions } from "../../engine/protocols/element-renderer.js";
import { IRenderer } from "../../engine/protocols/renderer.js";

export class TextRenderer implements IElementRenderer {
  render (renderer: IRenderer, element: IElement, options?: IElementRendererOptions): void {
    const x = element.x + (options?.translate?.x || 0);
    const y = element.y + (options?.translate?.y || 0);

    renderer.writeText(x, y, element.metadata.text, element.metadata.color, {
      ...element.metadata
    });
  }
}
