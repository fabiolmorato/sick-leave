import { IElement } from "../../engine/protocols/element.js";
import { Scene } from "../../engine/scene/index.js";

import { createRectangle } from "../elements/rectangle.js";
import { createText } from "../elements/text.js";

export class LoadingScene extends Scene {
  private loadingElement: IElement;
  private tickCount = 0;

  constructor () {
    super();

    this.loadingElement = createText("Loading...", 800, 615, "white", { align: "center", fontSize: 48 })

    this.layers.push({
      elements: [
        createRectangle(0, 0, "100%", "100%", "black"),
        this.loadingElement
      ],
      entities: []
    });
  }

  tick () {
    this.tickCount++;
    if (this.tickCount > 79) this.tickCount = 0;

    this.loadingElement.metadata.text = "Loading" + new Array(this.tickCount / 20 << 0).fill(".").join("");
  }
}
