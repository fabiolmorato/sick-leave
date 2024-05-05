import { IElement } from "./element.js";
import { IRenderer } from "./renderer.js";

export interface IElementRendererOptions {
  translate?: {
    x?: number;
    y?: number;
  }
}

export interface IElementRenderer {
  render (renderer: IRenderer, element: IElement, options?: IElementRendererOptions): void;
}
