import { IElement } from "../../engine/protocols/element.js";
import { IElementRenderer, IElementRendererOptions } from "../../engine/protocols/element-renderer.js";
import { IRenderer } from "../../engine/protocols/renderer.js";

import { logo } from "../images/logo.js";

export class LogoElementRenderer implements IElementRenderer {
  render (renderer: IRenderer, element: IElement, options?: IElementRendererOptions): void {
    const x = element.x + (options?.translate?.x || 0);
    const y = element.y + (options?.translate?.y || 0);

    renderer.drawImage(logo, x, y, element.width as number, element.height as number, {
      width: 1800,
      height: 1800
    });
  }
}
