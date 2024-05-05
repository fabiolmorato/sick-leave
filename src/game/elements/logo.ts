import { IElement } from "../../engine/protocols/element.js";

export const createLogo = (x: number, y: number, width = 400, height = 400): IElement => ({
  type: "logo",
  x,
  y,
  width,
  height,
  metadata: {}
});
