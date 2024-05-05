import { IElement } from "../../engine/protocols/element.js";
import { Scene } from "../../engine/scene/index.js";

import { createRectangle } from "../elements/rectangle.js";
import { createText } from "../elements/text.js";
import { createLogo } from "../elements/logo.js";
import { transition } from "../utils/transition.js";

export class StartMenuScene extends Scene {
  private menuOptions: IElement[] = [];
  private selectedOption = 0;
  
  private logo: IElement;
  private title: IElement;
  private verticalDisplacement = 600;
  private verticalDisplacementGenerator: Generator<number, void, number> | null = null;

  private ticks = 0;

  private readonly logoY = 375;
  private readonly titleY = 275;
  private readonly menuOptionsY = 875;

  constructor () {
    super();

    this.menuOptions.push(
      createText("> START <", 800, this.menuOptionsY, "black", { align: "center", fontSize: 36 }),
      createText("CREDITS", 800, this.menuOptionsY + 50, "black", { align: "center", fontSize: 36 })
    );

    this.logo = createLogo(600, this.logoY);
    this.title = createText("Sick Leave", 800, this.titleY, "black", { align: "center", fontSize: 72 });

    this.layers.push({
      elements: [
        createRectangle(0, 0, "100%", "100%", "orange")
      ],
      entities: []
    }, {
      elements: [
        this.title,
        this.logo,
        ...this.menuOptions
      ],
      entities: []
    });
  }

  tick () {
    super.tick();
    this.ticks++;
    this.updateElementsPositions();
  }

  public handleStart () {
    if (this.selectedOption === 0) {
      this.emit("start-game");
    } else if (this.selectedOption === 1) {
      this.transition();
      setTimeout(() => this.emit("credits"), 1000);
    }
  }

  public handleUp (immediate: boolean) {
    if (!immediate) return;

    this.selectedOption--;
    if (this.selectedOption < 0) this.selectedOption = this.menuOptions.length - 1;
    this.updateMenuSelection();
  }

  public handleDown (immediate: boolean) {
    if (!immediate) return;

    this.selectedOption++;
    if (this.selectedOption > this.menuOptions.length - 1) this.selectedOption = 0;
    this.updateMenuSelection();
  }

  private updateMenuSelection () {
    this.menuOptions.forEach((option, index) => {
      if (index === this.selectedOption) option.metadata.text = "> " + option.metadata.text + " <";
      else if (option.metadata.text?.startsWith(">")) option.metadata.text = option.metadata.text?.slice(2, -2);
    });
  }

  private updateElementsPositions () {
    if (this.verticalDisplacementGenerator) {
      const { value, done } = this.verticalDisplacementGenerator.next();
      if (done) {
        this.verticalDisplacementGenerator = null;
      } else {
        this.verticalDisplacement = value;
      }
    }

    this.logo.y = this.logoY - this.verticalDisplacement;
    this.title.y = this.titleY - this.verticalDisplacement;
    this.menuOptions[0].y = this.menuOptionsY + this.verticalDisplacement;
    this.menuOptions[1].y = this.menuOptionsY + 50 + this.verticalDisplacement;
  }

  private transition (back = false) {
    this.verticalDisplacement = back ? 900 : 0;
    this.verticalDisplacementGenerator = transition(this.verticalDisplacement, back ? 0 : 900, 0.065);
  }

  public onEnter () {
    this.transition(true);
  }
}
