import { IElement } from "../../engine/protocols/element.js";
import { Scene } from "../../engine/scene/index.js";

import { createRectangle } from "../elements/rectangle.js";
import { createText } from "../elements/text.js";

export class CreditsScene extends Scene {
  private tickCount = 0;
  private ticks = 0;   

  constructor () {
    super();

    this.layers.push({
      elements: [
        createRectangle(0, 0, "100%", "100%", "orange")
      ]
    }, {
      elements: [
        createText("CREDITS", 800, 475, "black", { align: "center", fontSize: 48 }),
        createText("Sick Leave game and 2D engine created by Fábio Lino Morato (fabio@maroto.dev).", 800, 575, "black", { align: "center", fontSize: 32 }),
        createText("This was built as the Introduction to Programming I Game Project Midterm.", 800, 625, "black", { align: "center", fontSize: 32 }),
        createText("Press ESC or Back Button to return to main menu.", 800, 725, "black", { align: "center", fontSize: 32 })
      ],
      entities: []
    });
  }

  tick () {
    this.tickCount++;
    this.ticks++;
    if (this.tickCount > 79) this.tickCount = 0;
  }

  public handleBack () {
    this.emit("back");
  }
}
