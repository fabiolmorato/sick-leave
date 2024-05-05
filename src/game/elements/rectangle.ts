import { IElement } from "../../engine/protocols/element.js";
import { IRectangleOptions } from "../../engine/protocols/renderer.js";

export const createRectangle = (x: number, y: number, width: string | number, height: string | number, color: string, options?: IRectangleOptions): IElement => ({
  type: "rectangle",
  x,
  y,
  width,
  height,
  metadata: {
    color,
    radius: options?.radius,
    filled: options?.filled,
    border: options?.border
  }
});
