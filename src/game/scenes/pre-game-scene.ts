import { IElement } from "../../engine/protocols/element.js";
import { Scene } from "../../engine/scene/index.js";

import { createRectangle } from "../elements/rectangle.js";
import { createText } from "../elements/text.js";

export class PreGameScene extends Scene {
  private tickCount = 0;

  constructor () {
    super();

    this.layers.push({
      elements: [
        createRectangle(0, 0, "100%", "100%", "rgba(0, 0, 0, .2)"),
        createText("SICK LEAVE", 800, 375, "white", { align: "center", fontSize: 48 }),
        createText("Your boss won't leave you alone! Fortunately you got sick", 800, 475, "white", { align: "center", fontSize: 32 }),
        createText("and are entitled to a paid sick leave. But be careful!", 800, 525, "white", { align: "center", fontSize: 32 }),
        createText("Your path is filled with healthy traps you must avoid.", 800, 575, "white", { align: "center", fontSize: 32 }),
        createText("If you're not careful, you'll have to return to work.", 800, 625, "white", { align: "center", fontSize: 32 }),
        createText("Press Enter or START button to play.", 800, 725, "white", { align: "center", fontSize: 32 }),
        createText("Press ESC or BACK Button to return to main menu.", 800, 775, "white", { align: "center", fontSize: 32 })
      ],
      entities: []
    });
  }

  tick () {
    this.tickCount++;
    if (this.tickCount > 79) this.tickCount = 0;
  }

  public handleStart (immediate: boolean) {
    if (!immediate) return;
    
    this.emit("start");
  }

  public handleBack () {
    this.emit("back");
  }
}
