import { IElement } from "../../engine/protocols/element.js";
import { ITextOptions } from "../../engine/protocols/renderer.js";

export const createText = (text: string, x: number, y: number, color: string, options?: ITextOptions): IElement => ({
  type: "text",
  x,
  y,
  ...(options?.ttl && {
    deleteAt: Date.now() + options.ttl
  }),
  metadata: {
    text,
    color,
    align: options?.align,
    fontSize: options?.fontSize,
    outline: options?.outline
  }
});
